import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const setAction = (action) =>{
  return {
    type: 'setAction',
    payload: action
  }
}

export const selectGradeCard = (gradeCard) =>{
  return {
    type: 'selectGradeCard',
    payload: gradeCard
  }
}

export const gradeCard = (id, index, gradeCard) =>{
  return {
    type: 'gradeCard',
    payload: { studentProjectId: id, index: index, gradeCard: gradeCard}
  }
}

export const viewCards = (cards) =>{
  return {
    type: 'viewCards',
    payload: cards
  }
}

export const viewCard = (card) =>{
  return {
    type: 'viewCard',
    payload: card
  }
}

export const gradeCards = (id, cards) =>{
  return {
    type: 'gradeCards',
    payload: { studentProjectId: id, cards: cards}
  }
}

export function studentReadCard(cardId){
  return async function (dispatch) {
    let err, cardRes;
    [err, cardRes] = await to(axios.post(api + '/card/studentRead', {data: {cardId: cardId}}));
    if(err){actions.connectionError(dispatch); return;}

    if(cardRes.data.result === 'success'){
      dispatch({type: 'updateCards', payload: [cardRes.data.updatedCard]});
    }
  }
}

export function saveGradingCards(projectId, studentProjectId, gradingCards){
  //console.log(gradingCards)
  return async function (dispatch) {
    actions.connecting(dispatch);
    var cardFile = new FormData();
    for(var i=0;i<gradingCards.length;i++){
      if(gradingCards[i].audioCommentEdited && gradingCards[i].audioCommentBlob){
        cardFile.append('files', gradingCards[i].audioCommentBlob, 'audioComment_' + i + '.wav');
      }
    }

    let err, uploadRes, cardRes;
    [err, uploadRes] = await to(axios.post(api + '/upload', cardFile, { headers: { type: 'audioComment'}}))
    if(err){ actions.connectionError(dispatch); return; }

    const filenames = uploadRes.data.filenames;
    var cardsToUpdate = [];
    for(var j=0;j<gradingCards.length;j++){
      if(gradingCards[j].audioCommentEdited || gradingCards[j].edited){
        var cardToUpdate = {...gradingCards[j]};
        if(gradingCards[j].audioCommentEdited){
          cardToUpdate = {...cardToUpdate, ...{
            audioComment: getFile(filenames, j)
          }}
        }
        cardsToUpdate.splice(0,0,cardToUpdate);
      }
    }

    [err, cardRes] = await to(axios.post(api + '/card/grade', { data: { projectId: projectId, studentProjectId: studentProjectId, cards: cardsToUpdate}}))
    if(err){actions.connectionError(dispatch); return;}

    if(cardRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Grading card succeed!', '成功評核卡片!', '成功评核卡片!']});
      dispatch({type: 'pullView'});
      dispatch({type: 'updateCards', payload: cardRes.data.updatedCards});
      dispatch({type: 'updateProfiles', payload: [cardRes.data.updatedProfile]});
      dispatch({type: 'saveGradeCard', payload: { studentProjectId: studentProjectId}});
    }else{
      dispatch({type: 'message', payload: ['Grading card failed! Please try again!', '評核失敗! 請再試一次!', '评核失败! 请再试一次!']});
    }

  }
}

export function getCards(cardsId){
  //console.log(cardsId);
  return async function (dispatch) {
    let err, cardsRes;
    [err, cardsRes] = await to(axios.post(api + '/card/getMultiple', { data: { cards: cardsId}}))
    if(err){actions.connectionError(dispatch); return;}

    if(cardsRes.data.result === 'success'){
      dispatch({type: 'updateLangs', payload: cardsRes.data.langs});
      dispatch({type: 'updateCards', payload: cardsRes.data.cards});
      dispatch({type: 'updateProfiles', payload: cardsRes.data.profiles});
    }else{
      console.log('get cards failed!')
    }
  }
}

export function editCard(data){
  return async function (dispatch) {
    actions.connecting(dispatch);
    var card = data.card;
    const newIcon = data.newIcon;
    const editLangs = data.editLangs;

    if(data.newGeoLocated){
      card = {...card, ...{
        geoLocated: {
          altitude: data.newGeoLocated.altitude,
          latitude: data.newGeoLocated.latitude,
          longitude: data.newGeoLocated.longitude
        }
      }}
    }

    var cardFile = new FormData();

    let err, uploadRes, updateRes;
    if(newIcon){
      cardFile.append('files', newIcon, 'cardIcon.png');
    }

    for(var i=0;i<editLangs.length;i++){
      if(editLangs[i].audioBlob){
        cardFile.append('files', editLangs[i].audioBlob, 'langAudio_' + i + '.wav');
      }
    }

    [err, uploadRes] = await to(axios.post(api + '/upload', cardFile, { headers: { type: 'card'}}))
    if(err){actions.connectionError(dispatch); return;}

    const filenames = uploadRes.data.filenames;
    var cardIcon;
    var langAudios = [];
    for(var j=0;j<filenames.length;j++){
      const splted = filenames[j].split('-');
      if(splted[1] === 'cardIcon.png'){
        cardIcon = filenames[j];
      }else{
        langAudios.splice(0,0, filenames[j]);
      }
    }

    if(newIcon){
      card.icon = cardIcon;
    }
    const langs = [];
    for(var k=0;k<editLangs.length;k++){
      const lang = {
        key: editLangs[k].key,
        text: editLangs[k].text,
        audio: editLangs[k].audioBlob? getFile(langAudios, k): editLangs[k].defaultAudio,
        _id: editLangs[k]._id
      }
      langs.splice(0,0,lang);
    }

    [err, updateRes] = await to(axios.post(api + '/card/edit', { data: { card: card, langs: langs}}))
    if(err){actions.connectionError(dispatch); return;}


    if(updateRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Edit card succeed!', '成功修改卡片!', '成功修改卡片!']});
      dispatch({type: 'updateCards', payload: [updateRes.data.updatedCard]});
      dispatch({type: 'updateLangs', payload: updateRes.data.updatedLangs});

      dispatch({type: 'setEditLangs', payload: []});
      dispatch({type: 'pullView'});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Edit card failed! Please try again!', '修改失敗! 請再試一次!', '修改失败! 请再试一次!']});
    }

  }
}

export function addCard(data){
  console.log(data);
  return async function (dispatch) {
    actions.connecting(dispatch);

    var cardFile = new FormData();
    if(!data.resubmit){
      cardFile.append('files', data.icon, 'cardIcon.png');
    }else if(data.newIcon){
      cardFile.append('files', data.newIcon, 'cardIcon.png');
    }
    const editLangs = data.editLangs;
    for(var i=0;i<editLangs.length;i++){
      if(editLangs[i].audioBlob){
        cardFile.append('files', editLangs[i].audioBlob, 'langAudio_' + i + '.wav');
      }
    }
    let err, uploadRes, cardRes;
    [err, uploadRes] = await to(axios.post(api + '/upload', cardFile, { headers: { type: 'card'}}))
    if(err){actions.connectionError(dispatch); return;}

    const filenames = uploadRes.data.filenames;
    var cardIcon = null;
    var langAudios = [];
    for(var j=0;j<filenames.length;j++){
      const splted = filenames[j].split('-');
      if(splted[1] === 'cardIcon.png'){
        cardIcon = filenames[j];
      }else{
        langAudios.splice(0,0, filenames[j]);
      }
    }

    const card = {
      icon: cardIcon? cardIcon: data.icon,
      author: data.author,
      studentProject: data.isTeacher? null: data.studentProject,
      grade: 'featured',
      geoLocated: {
        altitude: data.geoLocated.altitude,
        latitude: data.geoLocated.latitude,
        longitude: data.geoLocated.longitude
      }
    }
    const langs = [];
    for(var k=0;k<editLangs.length;k++){
      const lang = {
        key: editLangs[k].key,
        text: editLangs[k].text,
        audio: getFile(langAudios, k)? getFile(langAudios, k): editLangs[k].defaultAudio
      }
      langs.splice(0,0,lang);
    }
    [err, cardRes] = await to(axios.post(api + '/card/add', { data: { project: data.project, card: card, langs: langs, isTeacher: data.isTeacher, resubmitCard: data.resubmitCard}}))
    if(err){actions.connectionError(dispatch); return;}

    if(cardRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Submit card succeed!', '成功提交卡片!', '成功提交卡片!']});
      //console.log(cardRes.data);
      dispatch({type: 'updateCards', payload: [cardRes.data.card]});
      dispatch({type: 'updateCards', payload: [cardRes.data.updatedCard]});
      dispatch({type: 'updateLangs', payload: cardRes.data.langs});

      dispatch({type: 'updateProjects', payload: [cardRes.data.updatedProject]});
      dispatch({type: 'viewProject', payload: cardRes.data.updatedProject});

      dispatch({type: 'updateStudentProjects', payload: [cardRes.data.updatedStudentProject]});
      dispatch({type: 'viewStudentProject', payload: cardRes.data.updatedStudentProject});

      dispatch({type: 'setEditLangs', payload: []});
      //dispatch({type: 'setPhoto', payload: {photoUrl: null, photoBlob: null}});
      dispatch({type: 'setProfile', payload: cardRes.data.updatedProfile});

      dispatch({type: 'pullView'});
    }else{
      console.log(cardRes.data.result);
      dispatch({type: 'message', payload: ['Submit card failed! Please try again!', '提交失敗! 請再試一次!', '提交失败! 请再试一次!']});
    }

  }
}

function getFile(files, index){
  for(var i=0;i<files.length;i++){
    const splited = files[i].split('.');
    const fileIndex = splited[0].slice(-1);
    if(fileIndex === '' + index){
      return files[i]
    }
  }
  return '';
}
