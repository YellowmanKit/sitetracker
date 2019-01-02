import * as reducer from '../reducer';

const coursesReducer = (
  state = {
    courses: [],
    viewingCourse: {},
    teachingCourses: [],
    joinedCourses: []
  }, action)=>{
  switch (action.type) {
    case 'leaveCourse':
      var joinedCourses = state.joinedCourses.slice(0);
      var index = joinedCourses.indexOf(action.payload);
      if (index > -1) {
        joinedCourses.splice(index, 1);
      }
      return {...state, joinedCourses: joinedCourses}
    case 'updateCourses':
        return {...state, courses: reducer.updateElements(state.courses, action.payload)};
    case 'updateJoinedCourses':
        return {...state, joinedCourses: reducer.updateElements(state.joinedCourses, action.payload, true)};
    case 'updateTeachingCourses':
        return {...state, teachingCourses: reducer.updateElements(state.teachingCourses, action.payload, true, true)};
    case 'viewCourse':
      return {...state, viewingCourse: action.payload};
    default:
      return state;
  }
}

export default coursesReducer;
