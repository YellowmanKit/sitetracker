import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const viewGroup = (group) =>{
  return {
    type: 'viewGroup',
    payload: group
  }
}

export function fetchGroupData(group){
  return async function (dispatch){
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/group/fetchData', { data: { group: group } }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: "hideModal"});
      dispatch({type: 'updateGroupData', payload: res.data.groupData});
      dispatch({type: 'updateProfiles', payload: res.data.profiles});
      dispatch({type: 'updateStudentProjects', payload: res.data.studentProjects});
      dispatch({type: 'updateCards', payload: res.data.cards});
      dispatch({type: 'updateLangs', payload: res.data.langs});
    }else{
      dispatch({type: 'message', payload: ['Failed to fetch group data!', '無法查閱小組資料!', '无法查阅小组资料!']});
    }
  }
}

export function leaveGroup(userId, groupCode){
  return async function (dispatch){
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/group/leave', { data: { userId: userId, groupCode: groupCode} }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Leave group succeed!', '成功退出小組!', '成功退出小组!']});
      dispatch({type: 'updateGroups', payload: [res.data.group]});
    }else{
      dispatch({type: 'message', payload: ['Failed to leave group! Please try again!', '退出失敗! 請再試一次!', '退出失败! 请再试一次!']});
    }
  }
}

export function joinGroup(userId, groupCode){
  return async function (dispatch){
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/group/join', { data: { userId: userId, groupCode: groupCode} }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Join group succeed!', '成功加入小組!', '成功加入小组!']});
      dispatch({type: 'updateGroups', payload: [res.data.group]});
    }else{
      dispatch({type: 'message', payload: ['Failed to join group! Please check if the group code is correct!', '加入失敗! 請檢查小組代碼是否正確!', '加入失败! 请检查小组代码是否正确!']});
    }
  }
}

export function createGroup(userId, projectId, groupName){
  console.log(userId);
  return async function (dispatch){
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/group/add', { data: { userId: userId, projectId: projectId, groupName: groupName } }));
    if(err){actions.connectionError(dispatch); return;}
    console.log(res.data);
    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Create group succeed!', '成功創建小組!', '成功创建小组!']});
      dispatch({type: 'updateGroups', payload: [res.data.group]});
    }else if(res.data.existedGroup){
      const code = res.data.existedGroup.code;
      dispatch({type: 'message', payload: ['You aleady created a group for this project! Code of your group: ' + code, '你已為這個專題研習創建了小組! 你的小組代碼: ' + code, '你已为这个专题研习创建了小组! 你的小组代码: ' + code]});
    }else{
      dispatch({type: 'message', payload: ['Failed to create group! Please try again!', '創建失敗! 請再試一次!', '创建失败! 请再试一次!']});
    }
  }
}
