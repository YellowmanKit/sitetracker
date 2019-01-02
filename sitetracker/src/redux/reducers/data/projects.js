import * as reducer from '../reducer';

const projectsReducer = (
  state = {
    projects: [],
    viewingProject: {},
    teachingProjects: [],
    joinedProjects: []
  }, action)=>{
  switch (action.type) {
    case 'updateProjects':
      return {...state, projects: reducer.updateElements(state.projects, action.payload)};
    case 'updateJoinedProjects':
        return {...state, joinedProjects: reducer.updateElements(state.joinedProjects, action.payload, true)};
    case 'updateTeachingProjects':
        return {...state, teachingProjects: reducer.updateElements(state.teachingProjects, action.payload, true)};
    case 'viewProject':
      if(!action.payload){ return state; }
      return {...state, viewingProject: action.payload};
    default:
      return state;
  }
}

export default projectsReducer;
