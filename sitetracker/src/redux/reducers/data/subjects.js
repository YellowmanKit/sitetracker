import * as reducer from '../reducer';

const subjectsReducer = (
  state = {
    subjects: [],
    viewingSubject: {},
    teachingSubjects: [],
    joinedSubjects: []
  }, action)=>{
  switch (action.type) {
    case 'updateSubjects':
      return {...state, subjects: reducer.updateElements(state.subjects, action.payload)};
    case 'updateJoinedSubjects':
        return {...state, joinedSubjects: reducer.updateElements(state.joinedSubjects, action.payload, true)};
    case 'updateTeachingSubjects':
        return {...state, teachingSubjects: reducer.updateElements(state.teachingSubjects, action.payload, true)};
    case 'viewSubject':
      return {...state, viewingSubject: action.payload};
    default:
      return state;
  }
}

export default subjectsReducer;
