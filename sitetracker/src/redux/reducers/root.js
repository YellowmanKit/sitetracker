import { combineReducers } from "redux";
import main from './control/main';
import switches from './control/switches';
import content from './control/content';
import ui from './control/ui';
import modal from './control/modal';
import notices from './control/notices';

import user from './data/user';
import profile from './data/profile';
import schools from './data/schools';
import courses from './data/courses';
import subjects from './data/subjects';
import profiles from './data/profiles';
import projects from './data/projects';
import studentProjects from './data/studentProjects';
import groups from './data/groups';

import cards from './data/cards';
import langs from './data/langs';

const rootReducer = combineReducers({
  main: main,
  switches: switches,
  content: content,
  ui: ui,
  modal: modal,
  notices: notices,

  user: user,
  profile: profile,
  schools: schools,
  courses: courses,
  subjects: subjects,
  profiles: profiles,
  projects: projects,
  studentProjects: studentProjects,
  groups: groups,

  cards: cards,
  langs: langs
});

export default rootReducer;
