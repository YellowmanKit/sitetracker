import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const updateStudentProjects = (studentProjects) =>{
  return {
    type: 'updateStudentProjects',
    payload: studentProjects
  }
}

export const viewStudentProject = (_studentProject) =>{
  return {
    type: 'viewStudentProject',
    payload:  _studentProject
  }
}

export function getAllStudentProjectsOfUser(profile){
  return async function (dispatch) {
    let err, res;
    [err, res] = await to(axios.post(api + '/studentProject/getByStudent', { data: profile }));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: 'updateStudentProjects', payload: res.data.studentProjects});
      dispatch({type: 'updateProjects', payload: res.data.projects});
      dispatch({type: 'updateProfiles', payload: [res.data.updatedProfile]});
      dispatch({type: 'viewProfile', payload: res.data.updatedProfile});
      dispatch({type: 'hideModal'});
    }else{
      dispatch({type: 'message', payload: ['Failed to get student projects data!', '無法查閱學生專題研習資料!', '无法查阅学生专题研习资料!']});
    }
  }
}

export function update(studentProject){
  return async function (dispatch) {
    actions.connecting(dispatch);
    let err, res;
    [err, res] = await to(axios.post(api + '/studentProject/update', { data: studentProject }));
    if(err){ actions.connectionError(dispatch); return; }
    if(res.data.result === 'success'){
      dispatch({type: 'updateStudentProjects', payload: [res.data.updatedStudentProject]});
      dispatch({type: 'viewStudentProject', payload: res.data.updatedStudentProject});
      dispatch({type: 'viewCards', payload: res.data.updatedStudentProject.cards});
      dispatch({type: 'hideModal'});
    }
  }
}

export function getStudentProjects(studentProjects){
  //console.log(studentProjects);
  return async function (dispatch) {
    //actions.connecting(dispatch);
    let err, res;
    [err, res] = await to(axios.post(api + '/studentProject/getMultiple', { data: studentProjects }));
    if(err){ actions.connectionError(dispatch); return; }
    //console.log(res.data);
    if(res.data.result === 'success'){
      dispatch({type: 'updateStudentProjects', payload: res.data.studentProjects});
      dispatch({type: 'updateCards', payload: res.data.cards});
      dispatch({type: 'updateLangs', payload: res.data.langs});
      dispatch({type: 'updateProfiles', payload: res.data.profiles});
    }else{
      dispatch({type: 'message', payload: ['Failed to get student projects data!', '無法查閱學生專題研習資料!', '无法查阅学生专题研习资料!']});
    }
  }
}

export function getStudentProject(_student, _project){
  return async function (dispatch) {
    let err, res;
    [err, res] = await to(axios.get(api + '/studentProject/get', { headers: { student: _student, project: _project }}))
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: 'updateStudentProjects', payload: [res.data.studentProject]});
      dispatch({type: 'viewStudentProject', payload: res.data.studentProject});
      dispatch({type: 'updateProject', payload: res.data.updatedProject});
    }else{
      console.log('failed to get studentProject')
    }
  }
}
