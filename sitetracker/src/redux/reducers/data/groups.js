import * as reducer from '../reducer';

const coursesReducer = (
  state = {
    groups: [],
    viewingGroup: {},
    data: {}
  }, action)=>{
  var data = state.data;
  switch (action.type) {
    case 'viewGroup':
      return {...state, viewingGroup: action.payload}
    case 'updateGroupData':
      data[action.payload.group] = action.payload;
      return {...state, data: data}
    case 'updateGroups':
        return {...state, groups: reducer.updateElements(state.groups, action.payload)};
    default:
      return state;
  }
}

export default coursesReducer;
