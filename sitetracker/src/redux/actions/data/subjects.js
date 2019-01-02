import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const viewSubject = (subject) =>{
  return {
    type: 'viewSubject',
    payload: subject
  }
}

export function getAllSubjectsOfUser(profile){
  return async function (dispatch){
    let err, res;
    [err, res] = await to(axios.post(api + '/subject/getAllOfUser', { data: profile }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'updateSubjects', payload: res.data.subjects});
      dispatch({type: 'updateProjects', payload: res.data.projects});
      dispatch({type: 'updateStudentProjects', payload: res.data.studentProjects});
      dispatch({type: 'updateProfiles', payload: [res.data.profile]});
      dispatch({type: 'viewProfile', payload: res.data.profile});
    }else{
      dispatch({type: 'message', payload: ['Failed to get subjects data!', '無法查閱議題資料!', '无法查阅议题资料!']});
    }
  }
}

export function getSubjects(subjects){
  //console.log(subjects)
  return async function (dispatch) {
    //actions.connecting(dispatch);
    let err, res;
    [err, res] = await to(axios.post(api + '/subject/getMultiple', { data: subjects }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'updateSubjects', payload: res.data.subjects});
    }else{
      dispatch({type: 'message', payload: ['Failed to get subjects data!', '無法查閱議題資料!', '无法查阅议题资料!']});
    }

  }
}

export function editSubject(editedSubject){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, uploadRes, updateRes;

    if(editedSubject.newIcon){
      var iconFile = new FormData();
      iconFile.append('files', editedSubject.newIcon, 'subjectIcon.png');
      [err, uploadRes] = await to(axios.post(api + '/upload', iconFile, { headers: { type: 'subjectIcon'}}))
      if(err){actions.connectionError(dispatch); return;}

      editedSubject['icon'] = uploadRes.data.filenames[0];
    }

    [err, updateRes] = await to(axios.post(api + '/subject/edit', {data: editedSubject}));
    if(err){actions.connectionError(dispatch); return;}

    if(updateRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Edit subject succeed!', '成功修改議題!', '成功修改议题!']});
      dispatch({type: 'updateSubjects', payload: [updateRes.data.editedSubject]});
      dispatch({type: 'viewSubject', payload: updateRes.data.editedSubject});
      dispatch({type: 'pullView'});
    } else {
      actions.updateFailed(dispatch);
    }
  }
}

export function addSubject(newSubject){
  //console.log(newSubject)
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, uploadRes, addRes;

    var iconFile = new FormData();
    iconFile.append('files', newSubject.icon, 'subjectIcon.png');

    [err, uploadRes] = await to(axios.post(api + '/upload', iconFile, { headers: { type: 'subjectIcon'}}));
    if(err){actions.connectionError(dispatch); return;}
    //console.log('File uploaded');
    if(uploadRes.data.result === 'success'){
      newSubject['icon'] = uploadRes.data.filenames[0];
    }else{
      actions.connectionError(dispatch);
      return;
    }

    [err, addRes] = await to(axios.post(api + '/subject/add', { data: { subject: newSubject } }));
    if(err){actions.connectionError(dispatch); return;}

    //console.log(res.data);
    if(addRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Add subject succeed!', '成功創建議題!', '成功创建议题!']});
      dispatch({type: 'updateSubjects', payload: [addRes.data.newSubject]});
      dispatch({type: 'updateTeachingSubjects', payload: [addRes.data.newSubject._id]});
      dispatch({type: 'updateCourses', payload: [addRes.data.updatedCourse]});
      dispatch({type: 'viewCourse', payload: addRes.data.updatedCourse});
      dispatch({type: 'pullView'});
      //dispatch({type: 'setPhoto', payload: {blob: null, url: null}});
    }else{
      dispatch({type: 'message', payload: ['Add subject failed! Please try again!', '創建失敗! 請再試一次!', '创建失败! 请再试一次!']});
    }

  }
}
