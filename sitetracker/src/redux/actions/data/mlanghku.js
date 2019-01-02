import * as actions from '../actions';
import axios from 'axios';
import to from '../to';
/*import Parse from 'parse';
Parse.initialize(process.env.REACT_APP_PARSE_APP_ID, process.env.PARSE_DOTNET_KEY);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER;*/
var api = actions.api();

export function fetchUser(id, pw){
  return async function (dispatch){
    let err, res, user;
    //[err, user] = await to(Parse.User.logIn(id, pw));
    [err, res] = await to(axios.post(api + '/mlanghku/login', { data: { id: id, pw: pw} } ));
    if(err || res.data.result !== 'success'){
      //console.log(res.data.result);
      dispatch({type: 'message', payload: ['Failed to login mlanghku! Please check if mlanghku id and password are correct in Account!', '無法登入mlanghku! 請在帳號資訊檢查mlanghku登入名稱及密碼是否正確!', '无法登入mlanghku! 请在帐号资讯检查mlanghku登入名称及密码是否正确!']});
      return;
    }
    user = res.data.user;
    console.log(user);

    /*const timestamp = actions.timestamp();
    [err, res] = await to(Parse.Cloud.run('RenewUser', { timestamp: timestamp }));
    if(err){ console.log(err.message); return; }
    console.log(res);
    const data = JSON.parse(res);
    console.log(data);
    processUserData(data)(dispatch);*/

    const data = JSON.parse(res.data.body);
    //console.log(data);
    processUserData(data)(dispatch);
  }
}

function fetchLangs(cardId){
  //console.log(cardId);
  return async function (dispatch){
    let err, res;
    var processedLangs = [];
    var langsId = [];
    //[err, langs] = await to(relation.query().find());
    [err, res] = await to(axios.post(api + '/mlanghku/fetch', { data: { className: 'CardLang', field: 'cardId', value: cardId } } ));
    if(err){ actions.mlanghkuDataFetchFailed(dispatch); return; }

    const langs = res.data.data;
    //console.log(langs);
    for(var i=0;i<langs.length;i++){
      const attributes = langs[i];
      const lang = {
        _id: langs[i].objectId,
        createdAt: attributes.createdAt,
        key: langKeyToKey(attributes.langKey),
        text: attributes.name,
        audio: attributes.sound? attributes.sound.url: null
      }
      processedLangs.push(lang);
      langsId.push(lang._id);
    }
    //console.log(processedCards);
    dispatch({type: 'updateLangs', payload: processedLangs});
    return langsId;
  }
}

function langKeyToKey(langKey){
  switch (langKey) {
    case 'zh_w':
      return 'chinese_written';
    case 'zh':
      return 'chinese_spoken';
    case 'pth':
      return 'pth_spoken';
    case 'pth_w':
      return 'pth_written';
    case 'en':
      return 'english';
    case 'hi':
      return 'hindi';
    case 'ur':
      return 'urdu';
    case 'ne':
      return 'nepalese';
    case 'tl':
      return 'tagalog';
    case 'jp':
      return 'japanese';
    case 'es':
      return 'spanish';
    case 'de':
      return 'german';
    case 'fr':
      return 'french';
    default:
      return 'chinese_written'
  }
}

function fetchCards(studentProjectId){
  return async function (dispatch){
    let err, res;
    var processedCards = [];
    var cardsId = [];
    //[err, cards] = await to(relation.query().find());
    [err, res] = await to(axios.post(api + '/mlanghku/fetch', { data: { className: 'Card', field: 'studentProject', value: { __type: 'Pointer', className: 'StudentProject', objectId: studentProjectId } } } ));
    if(err){ actions.mlanghkuDataFetchFailed(dispatch); return; }

    var cards = res.data.data;
    //console.log(cards);
    for(var i=0;i<cards.length;i++){
      const attributes = cards[i];
      const langsId = await fetchLangs(attributes.cardId)(dispatch);
      const card = {
        _id: cards[i].objectId,
        comment: attributes.comments? attributes.comments.join():'',
        audioComment: attributes.commentSound? attributes.commentSound.url:null,
        langs: langsId,
        author: attributes.author.objectId,
        icon: attributes.image? attributes.image.url: '',
        createdAt: attributes.createdAt,
        grade: statusToGrade(attributes.status)
      }
      processedCards.push(card);
      cardsId.push(card._id);
    }
    //console.log(processedCards);
    dispatch({type: 'updateCards', payload: processedCards});
    return cardsId;
  }
}

function statusToGrade(status){
  switch (status) {
    case 0:
      return 'notGraded'
    case 1:
      return 'passed'
    case 2:
      return 'failed'
    case 3:
      return 'featured'
    default:
      return 'notGraded'
  }
}

export function fetchStudentProjects(project){
  return async function (dispatch){
    let err, res, data;
    /*const query = new Parse.Query('StudentProject');
    query.equalTo('project', { __type: 'Pointer', className: 'Project', objectId: project._id });
    [err, data] = await to(query.find());*/
    [err, res] = await to(axios.post(api + '/mlanghku/fetch', { data: { className: 'StudentProject', field: 'project', value: { __type: 'Pointer', className: 'Project', objectId: project._id } } } ));
    if(err){ actions.mlanghkuDataFetchFailed(dispatch); return; }
    data = res.data.data;

    //console.log(data);
    var updatedProject = project;
    var studentProjects = [];
    var studentProjectsId = [];
    for(var i=0;i<data.length;i++){
      const attributes = data[i];
      //console.log(attributes);
      const cardsId = await fetchCards(attributes.objectId)(dispatch);
      const studentProject = {
        _id: data[i].objectId,
        project: attributes.project.objectId,
        student: attributes.student? attributes.student.objectId: '',
        cards: cardsId,
        createdAt: attributes.createdAt
      }
      studentProjectsId.push(studentProject._id);
      studentProjects.push(studentProject);
    }
    updatedProject.studentProjects = studentProjectsId;
    updatedProject.fetched = true;
    dispatch({type: 'updateStudentProjects', payload: studentProjects});
    dispatch({type: 'updateProjects', payload: [updatedProject]});
    dispatch({type: 'viewProject', payload: updatedProject});
  }
}

function processUserData(data){
  const courses = data.courses? data.courses: [data['my-course']];
  const projects = data['my-projects'].slice(0);
  return function (dispatch){
    var processedCourses = [];
    var subjects = [];
    var processedProjects = [];
    var coursesIds = [];
    for(var i in courses){
      const course = {
        mlanghku: true,
        _id: courses[i].objectId,
        icon: courses[i].courseIcon? courses[i].courseIcon.url: null,
        teacher: courses[i].courseTeacher,
        title: courses[i].courseTitle,
        subjects: [courses[i].objectId],
        joinedStudents: [],
        code: '',
        endDate: new Date(),
        createdAt: new Date(),
      }
      var subject = {
        mlanghku: true,
        _id: course._id,
        course: course._id,
        title: 'mlangHKU',
        description: '',
        createdAt: new Date(),
        projects: []
      }
      for(var j in projects){
        if(projects[j].course.objectId === course._id){
          const project = {
            mlanghku: true,
            _id: projects[j].objectId,
            icon: projects[j].projectIcon? projects[j].projectIcon.url: null,
            title: projects[j].projectTitle,
            description: projects[j].projectDesc,
            subject: subject._id,
            endDate: new Date(projects[j].dueDate.iso),
            createdAt: new Date(projects[j].createdAt),
            studentProjects: []
          }
          subject['projects'].splice(0, 0, project._id);
          processedProjects.push(project)
        }
      }
      subjects.push(subject);
      coursesIds.push(course._id);
      processedCourses.push(course);
    }
    dispatch({type: 'updateProjects', payload: processedProjects});
    dispatch({type: 'updateSubjects', payload: subjects});
    dispatch({type: 'updateCourses', payload: processedCourses});
    if(data.courses){
      dispatch({type: 'updateTeachingCourses', payload: coursesIds});
    }else{
      dispatch({type: 'updateJoinedCourses', payload: coursesIds});
    }
  }
}
