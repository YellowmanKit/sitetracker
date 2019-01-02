import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export function changeProfile(data){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, uploadRes, updateRes;

    var iconFile = new FormData();
    iconFile.append('files', data.newIconBlob, 'profileIcon.png');

    [err, uploadRes] = await to(axios.post(api + '/upload', iconFile, { headers: { type: 'profileIcon'}}));
    if(err){actions.connectionError(dispatch); return;}
    //console.log('File uploaded');
    if(uploadRes.data.result === 'success'){
      data['newIcon'] = uploadRes.data.filenames[0];
    }else{
      actions.connectionError(dispatch);
      return;
    }

    [err, updateRes] = await to(axios.post(api + '/profile/update',{ data: data }));
    if(err){actions.connectionError(dispatch); return; }

    if(updateRes.data.result === 'success'){
      actions.updateSuccess(dispatch);
      dispatch({type: 'setProfile', payload: updateRes.data.updatedProfile});
      dispatch({type: 'updateProfiles', payload: [updateRes.data.updatedProfile]});
      dispatch({type: 'backToHome'});
    }else{
      actions.updateFailed(dispatch);
    }

  }
}
