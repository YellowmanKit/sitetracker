import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const viewSchool = (school) =>{
  return {
    type: 'viewSchool',
    payload: school
  }
}

export function getStatistics(schoolId){
  return async function (dispatch) {
      let err, res;
      [err, res] = await to(axios.post(api + '/school/getStatistics', { data: schoolId }));
      if(err){actions.connectionError(dispatch); return;}

      if(res.data.result === 'success'){
        dispatch({type: 'setStatistics', payload: {schoolId: schoolId, statistics: res.data.statistics}});
      } else {
        dispatch({type: 'message', payload: ['Failed to load school statistics!',  '無法查閱學校統計數據！',  '无法查阅学校统计数据！']});
      }
  }
}


export function getSchools(schools){
  //console.log(projects)
  return async function (dispatch) {
    //actions.connecting(dispatch);
    let err, res;
    [err, res] = await to(axios.post(api + '/school/getMultiple', { data: schools }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'updateSchools', payload: res.data.schools});
    }else{
      dispatch({type: 'message', payload: ['Failed to get schools data!', '無法查閱學校資料!', '无法查阅学校资料!']});
    }

  }
}


export function leaveSchool(_data){

  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/school/leave', { data: _data }));
    if(err){actions.connectionError(dispatch); return;}


    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Leave school succeed!', '成功退出學校!', '成功退出学校!']});
      if(res.data.updatedUser){
        dispatch({type: 'setUser', payload: res.data.updatedUser});
      }
      dispatch({type: 'updateSchools', payload: [res.data.leavedSchool]});
      dispatch({type: 'leaveSchool', payload: res.data.leavedSchool._id});
      dispatch({type: 'setProfile', payload: res.data.updatedProfile});
      dispatch({type: 'backToHome'});
    } else {
      dispatch({type: 'message', payload: ['Leave school failed! Please Try again!',  '退出失敗! 請再試一次!',  '退出失败! 请再试一次!']});
    }
  }
}

export function joinSchool(_data){

  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/school/join', { data: _data }));
    if(err){actions.connectionError(dispatch); return;}


    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Join school succeed!', '成功加入學校!', '成功加入学校!']});
      dispatch({type: 'updateSchools', payload: [res.data.joinedSchool]});
      dispatch({type: 'updateJoinedSchools', payload: [res.data.joinedSchool._id]});
      dispatch({type: 'setProfile', payload: res.data.updatedProfile});
      dispatch({type: 'backToHome'});
    } else {
      dispatch({type: 'message', payload: ['Join school failed! Please make sure to enter a correct code!', '加入失敗! 請確定代碼輸入正確!', '加入失败! 请确定代码输入正确!']});
    }
  }
}

export function editSchool(editedSchool){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, uploadRes, updateRes;

    if(editedSchool.newIcon){
      var iconFile = new FormData();
      iconFile.append('files', editedSchool.newIcon, 'schoolIcon.png');
      [err, uploadRes] = await to(axios.post(api + '/upload', iconFile, { headers: { type: 'schoolIcon'}}))
      if(err){actions.connectionError(dispatch); return;}

      editedSchool['icon'] = uploadRes.data.filenames[0];
    }

    [err, updateRes] = await to(axios.post(api + '/school/edit', {data: editedSchool}));
    if(err){actions.connectionError(dispatch); return;}


    if(updateRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Edit school succeed!', '成功修改學校!']});
      dispatch({type: 'updateSchools', payload: [updateRes.data.editedSchool]});
      dispatch({type: 'viewSchool', payload: updateRes.data.editedSchool});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Edit school failed! Please try again!', '修改失敗! 請再試一次!', '修改失败! 请再试一次!']});
    }
  }
}

export function addSchool(newSchool){
  //console.log(newSchool)
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, uploadRes, addRes;

    var iconFile = new FormData();
    iconFile.append('files', newSchool.icon, 'schoolIcon.png');

    [err, uploadRes] = await to(axios.post(api + '/upload', iconFile, { headers: { type: 'schoolIcon'}}));
    if(err){ actions.connectionError(dispatch); return; }

    if(uploadRes.data.result !== 'success'){
      actions.connectionError(dispatch);
      return;
    }

    newSchool['icon'] = uploadRes.data.filenames[0];

    [err, addRes] = await to(axios.post(api + '/school/add', { data: newSchool }));
    if(err){ actions.connectionError(dispatch); return; }


    if(addRes.data.result === 'success'){
      dispatch({type: 'message', payload: ['Add school succeed!', '成功創建學校!', '成功创建学校!']});
      dispatch({type: 'updateSchools', payload: [addRes.data.newSchool]});
      dispatch({type: 'updateSupervisingSchools', payload: [addRes.data.newSchool._id]});
      dispatch({type: 'backToHome'});
      //dispatch({type: 'setPhoto', payload: {blob: null, url: null}});
    }else{
      dispatch({type: 'message', payload: ['Add school failed! Please try again!', '創建失敗! 請再試一次!', '创建失败! 请再试一次!']});
    }

  }
}
