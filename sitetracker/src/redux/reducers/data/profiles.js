import * as reducer from '../reducer';

const profilesReducer = (
  state = {
    profiles: [],
    viewingProfile: {},
    viewingTeacherProfile: {},
    viewingAdminProfile: {},
    admins: []
  }, action)=>{
  switch (action.type) {
    case 'updateAdmins':
      return {...state, admins: reducer.updateElements(state.admins, action.payload, true)};
    case 'viewAdminProfile':
      return {...state, viewingAdminProfile: action.payload};
    case 'viewTeacherProfile':
      return {...state, viewingTeacherProfile: action.payload};
    case 'viewProfile':
      return {...state, viewingProfile: action.payload};
    case 'updateProfiles':
      return {...state, profiles: reducer.updateElements(state.profiles, action.payload)};
    default:
      return state;
  }
}

export default profilesReducer;
