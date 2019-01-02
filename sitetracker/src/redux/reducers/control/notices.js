import * as reducer from '../reducer';

const noticeReducer = (
  state = {
    notices: [

    ],
    status: 'off'
  }, action)=>{
  var notices = state.notices.slice(0);
  switch (action.type) {
    case 'removeNotice':
      notices[action.payload].dead = true;
      //notices.splice(action.payload, 1);
      return {...state, notices: notices};
    case 'killNotice':
      notices[action.payload].killed = true;
      return {...state, notices: notices};
    case 'updateNotices':
      return {...state, notices: reducer.updateElements(state.notices, action.payload)};
    case 'toggleNotice':
      const newStatus = state.status === 'off'? 'on': 'off';
      return {...state, status: newStatus};
    case 'setNotice':
      return {...state, notices: {...notices, status: action.payload}};
    default:
      return state;
  }
}

export default noticeReducer;
