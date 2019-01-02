import * as reducer from '../reducer';

const studentProjectsReducer = (
  state = {
    studentProjects: [],
    viewingStudentProject: {},
    teachingStudentProjects: [],
    joinedStudentProjects: []
  }, action)=>{
  switch (action.type) {
    case 'updateJoinedStudentProjects':
        return {...state, joinedStudentProjects: reducer.updateElements(state.joinedStudentProjects, action.payload, true)};
    case 'updateTeachingStudentProjects':
        return {...state, teachingStudentProjects: reducer.updateElements(state.teachingStudentProjects, action.payload, true)};
    case 'updateStudentProjects':
     return {...state, studentProjects: reducer.updateElements(state.studentProjects, action.payload)};
    case 'viewStudentProject':
      return {...state, viewingStudentProject: action.payload};
    default:
      return state;
  }
}

export default studentProjectsReducer;
