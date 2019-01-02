import axios from 'axios';
import * as actions from '../actions';
import to from '../to';

var api = actions.api();

export function addAdmin(userId){
  //console.log(newUser)
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/user/addAdmin',{ data: userId }));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Update succeed!', '更改成功!', '更改成功!']});
      dispatch({type: 'updateAdmins', payload: res.data.admins});
      dispatch({type: 'updateProfiles', payload: res.data.profiles});
      dispatch({type: 'pullView'});

    }else{
      dispatch({type: 'message', payload: ['Update failed! Please try again!', '更改失敗! 請再試一次!', '更改失败! 请再试一次']});
    }
  }
}

export function changeUserInfo(newUser){
  //console.log(newUser)
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/user/update',{ data: newUser }));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Update succeed!', '更改成功!', '更改成功!']});
      dispatch({type: 'setUser', payload: res.data.updatedUser});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Update failed! Please try again!', '更改失敗! 請再試一次!', '更改失败! 请再试一次']});
    }
  }

}

export function resetPassword (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return async function (dispatch) {
    dispatch({type: 'loadingMessage', payload: ['Reseting password...', '密碼重置中...', '密码重置中...']});

    let err, res;
    [err, res] = await to(axios.get(api + '/user/resetPassword',{ headers: { email: _email }}));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Reset password succeed! Please check email for new password!', '密碼重置成功! 請查看電子郵件!', '密码重置成功! 请查看电子邮件!']});
    }else{
      dispatch({type: 'message', payload: ['Failed to reset password! Please make sure to enter a correct email address!', '密碼重置失敗! 請確定電郵地址正確!', '密码重置失败! 请确定电邮地址正确!']});
    }

  }
}


export function getNewAccountByCode (code, codeType) {
  //console.log(code + ' ' + codeType);
  return async function (dispatch) {
    if(code.length < 5){

      dispatch({type: 'message', payload: ['Invalid code!', '代碼不正確!', '代码不正确!']});
      return;
    }
    dispatch({type: 'loadingMessage', payload: ['Acquiring for new account...', '申請進行中...', '申请进行中...']});

    let err, res;
    [err, res] = await to(axios.get(api + '/user/getNewAccountByCode',{ headers: { code: code, type: codeType }}));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      login(res.data.id, res.data.pw)(dispatch);
    }else{
      dispatch({type: 'message', payload: ['Failed to acquire new account! Please check if account type and code are correct!', '申請失敗! 請檢查帳號類別和代碼!', '申请失败! 请检查帐号类别和代码!']});
    }

  }
}

export function getNewAccount (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return async function (dispatch) {
    if(_email.indexOf('@') < 0){

      dispatch({type: 'message', payload: ['Invalid email!', '電郵地址不正確!', '电邮地址不正确!']});
      return;
    }
    dispatch({type: 'loadingMessage', payload: ['Acquiring for new account...', '申請進行中...', '申请进行中...']});

    let err, res;
    [err, res] = await to(axios.get(api + '/user/getNewAccount',{ headers: { email: _email }}));
    if(err){ actions.connectionError(dispatch); return; }


    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Acquire succeed! Please check your email for login infomation!', '申請成功! 請查看電子郵件!', '申请成功! 请查看电子邮件!']});
    }else{
      dispatch({type: 'message', payload: ['Failed to acquire new account! The email address is either invalid or already used!', '申請失敗! 電郵地址不正確或已被使用!', '申请失败! 电邮地址不正确或已被使用!']});
    }

  }
}

export function login (_id, _pw) {
  console.log(api);
  //console.log(_id + ' ' + _pw);
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.get(api + '/user/login',{ headers: { id: _id, pw: _pw }}));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      //console.log(res.data);
      dispatch({type: 'setUser', payload: res.data.user});
      dispatch({type: 'setProfile', payload: res.data.profile});
      dispatch({type: 'updateProfiles', payload: res.data.profiles});
      dispatch({type: 'updateStudentProjects', payload: res.data.studentProjects});
      dispatch({type: 'updateCards', payload: res.data.cards});
      dispatch({type: 'updateLangs', payload: res.data.langs});

      dispatch({type: 'updateAdmins', payload: res.data.admins});
      dispatch({type: 'updateSupervisingSchools', payload: res.data.supervisingSchools});

      dispatch({type: 'updateSchools', payload: res.data.schools});
      dispatch({type: 'updateCourses', payload: res.data.courses});
      dispatch({type: 'updateSubjects', payload: res.data.subjects});
      dispatch({type: 'updateProjects', payload: res.data.projects});
      dispatch({type: 'updateStudentProjects', payload: res.data.studentProjects});

      dispatch({type: 'updateTeachingCourses', payload: res.data.teachingCourses});
      dispatch({type: 'updateJoinedCourses', payload: res.data.joinedCourses});

      dispatch({type: 'updateTeachingSubjects', payload: res.data.teachingSubjects});
      dispatch({type: 'updateJoinedSubjects', payload: res.data.joinedSubjects});

      dispatch({type: 'updateTeachingProjects', payload: res.data.teachingProjects});
      dispatch({type: 'updateJoinedProjects', payload: res.data.joinedProjects});

      dispatch({type: 'updateTeachingStudentProjects', payload: res.data.teachingStudentProjects});
      dispatch({type: 'updateJoinedStudentProjects', payload: res.data.joinedStudentProjects});

      dispatch({type: 'updateTeachingCards', payload: res.data.teachingCards});
      dispatch({type: 'updateJoinedStudentCards', payload: res.data.joinedCards});

      dispatch({type: 'updateGroups', payload: res.data.groups});

      dispatch({type: 'setStatus', payload: 'ready'});
      dispatch({type: 'hideModal'});
    }else{
      dispatch({type: 'message', payload: ['Login failed! Invalid id or password!', '登入失敗! 名稱或密碼不正確!', '登入失败! 名称或密码不正确!']});
    }

  }
}

export function logout() {
  return function (dispatch) {
    //dispatch({type: 'setStatus', payload: 'waitForLogin'});
    window.location.reload();
  }
}
