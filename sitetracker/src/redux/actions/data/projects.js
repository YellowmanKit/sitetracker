import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const viewProject = (project) =>{
  return {
    type: 'viewProject',
    payload: project
  }
}

export function getRanking(projectId){
  return async function (dispatch) {
    let err, res;
    [err, res] = await to(axios.post(api + '/project/getRanking', { data: projectId }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      console.log(res.data);
      dispatch({type: 'updatePRofiles', payload: res.data.profiles});
      dispatch({type: 'setRanking', payload: {projectId: projectId, ranking: res.data.ranking}});
    }else{
      dispatch({type: 'message', payload: ['Failed to get project ranking!', '無法查閱專題研習排行榜!', '无法查阅专题研习排行榜!']});
    }
  }
}

export function getProjects(projects){
  //console.log(projects)
  return async function (dispatch) {
    //actions.connecting(dispatch);
    let err, res;
    [err, res] = await to(axios.post(api + '/project/getMultiple', { data: projects }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'updateProjects', payload: res.data.projects});
    }else{
      dispatch({type: 'message', payload: ['Failed to get projects data!', '無法查閱專題研習資料!', '无法查阅专题研习资料!']});
    }

  }
}

export function editProject(editedProject){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, uploadRes, updateRes;

    if(editedProject.newIcon){
      var iconFile = new FormData();
      iconFile.append('files', editedProject.newIcon, 'projectIcon.png');
      [err, uploadRes] = await to(axios.post(api + '/upload', iconFile, { headers: { type: 'projectIcon'}}))
      if(err){actions.connectionError(dispatch); return;}

      editedProject['icon'] = uploadRes.data.filenames[0];
    }

    [err, updateRes] = await to(axios.post(api + '/project/edit', {data: editedProject}));
    if(err){actions.connectionError(dispatch); return;}

    if(updateRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Edit project succeed!', '成功修改專題研習!', '成功修改专题研习!']});
      dispatch({type: 'updateProjects', payload: [updateRes.data.editedProject]});
      dispatch({type: 'viewProject', payload: updateRes.data.editedProject});
      dispatch({type: 'pullView'});
    } else {
      actions.updateFailed(dispatch);
    }
  }
}

export function addProject(newProject){
  //console.log(newProject)
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, uploadRes, addRes;

    var iconFile = new FormData();
    iconFile.append('files', newProject.icon, 'projectIcon.png');

    [err, uploadRes] = await to(axios.post(api + '/upload', iconFile, { headers: { type: 'projectIcon'}}));
    if(err){actions.connectionError(dispatch); return;}
    //console.log('File uploaded');
    if(uploadRes.data.result === 'success'){
      newProject['icon'] = uploadRes.data.filenames[0];
    }else{
      actions.connectionError(dispatch);
      return;
    }

    [err, addRes] = await to(axios.post(api + '/project/add', { data: newProject }));
    if(err){actions.connectionError(dispatch); return;}

    //console.log(res.data);
    if(addRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Add project succeed!', '成功創建專題研習!', '成功创建专题研习!']});
      dispatch({type: 'updateProjects', payload: [addRes.data.newProject]});
      dispatch({type: 'updateTeachingProjects', payload: [addRes.data.newProject._id]});
      dispatch({type: 'updateSubjects', payload: [addRes.data.updatedSubject]});
      dispatch({type: 'viewSubject', payload: addRes.data.updatedSubject});
      dispatch({type: 'pullView'});
      //dispatch({type: 'setPhoto', payload: {blob: null, url: null}});
    }else{
      dispatch({type: 'message', payload: ['Add project failed! Please try again!', '創建失敗! 請再試一次!', '创建失败! 请再试一次!']});
    }

  }
}
