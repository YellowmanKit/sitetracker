import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";
import axios from 'axios';

import * as main from './redux/actions/control/main';
import * as ui from './redux/actions/control/ui';
import * as switches from './redux/actions/control/switches';
import * as content from './redux/actions/control/content';
import * as modal from './redux/actions/control/modal';
import * as notices from './redux/actions/control/notices';

import * as user from './redux/actions/data/user';
import * as profile from './redux/actions/data/profile';
import * as schools from './redux/actions/data/schools';
import * as courses from './redux/actions/data/courses';
import * as subjects from './redux/actions/data/subjects';
import * as profiles from './redux/actions/data/profiles';
import * as projects from './redux/actions/data/projects';
import * as studentProjects from './redux/actions/data/studentProjects';
import * as mlanghku from './redux/actions/data/mlanghku';
import * as groups from './redux/actions/data/groups';

import * as cards from './redux/actions/data/cards';
import * as langs from './redux/actions/data/langs';

import getById from './functions/getById';
import checkAlert from './functions/checkAlert';

import Main from './components/main/Main';

class App extends Component {

  api(){ return this.isDev()? process.env.REACT_APP_API_DEV: process.env.REACT_APP_API; }

  isDev(){ return process.env.REACT_APP_DEV === 'true'; }

  randomNyan(){
    var i = this.randomInt(0, 6);
    switch (i) {
      case 0:
        return 'ennui';
      case 1:
        return 'fly';
      case 2:
        return 'tail';
      case 3:
        return 'lick';
      case 4:
        return 'relax';
      case 5:
        return 'sleep';
      case 6:
        return 'stretch';
      default:
        return 'sit'
    }
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  deltaDay(startDate, endDate){
    var deltaTime = Math.abs(startDate.getTime() - endDate.getTime());
    var deltaDay = Math.ceil(deltaTime / (1000 * 3600 * 24));
    return deltaDay;
  }

  outDated(date){
    const today = new Date();
    const dateToCheck = new Date(date);
    return dateToCheck < today;
  }

  translateUserType(type){
    const language = this.props.store.main.language;
    const eng = language === 'english';
    const chi = language === 'chinese';
    const sim_chi = language === 'simplified_chinese';

    switch (type) {
      case 'student':
        return(
        eng? 'student':
        chi? '學生':
        sim_chi? '学生':
        '')
      case 'teacher':
        return(
        eng? 'teacher':
        chi? '老師':
        sim_chi? '老师':
        '')
      case 'admin':
        return(
        eng? 'admin':
        chi? '管理員':
        sim_chi? '管理员':
        '')
      case 'developer':
        return(
        eng? 'developer':
        chi? '開發者':
        sim_chi? '开发者':
        '')
      default:
    }
  }

  getAllFeaturedCardsIdInViewingProject(){
    var featuredCardsId = [];
    const project = this.props.store.projects.viewingProject;
    const studentProjectsData = project.studentProjects;
    var studentProjectsToGet = [];
    var cardsToGet = [];
    for(var i=0;i<studentProjectsData.length;i++){
      const studentProject = getById.studentProject(studentProjectsData[i], this.props.store);
      if(!studentProject){
        studentProjectsToGet = [...studentProjectsToGet, studentProjectsData[i]]
        continue;
      }
      const cardsId = studentProject.cards;
      for(var j=0;j<cardsId.length;j++){
        const card = getById.card(cardsId[j], this.props.store);
        if(!card){
          cardsToGet = [...cardsToGet, cardsId[j]]
          continue;
        }
        if(card.grade === 'featured'){
          featuredCardsId = [...featuredCardsId, cardsId[j]];
        }
      }
    }
    if(studentProjectsToGet.length > 0){
      this.props.actions.studentProjects.getStudentProjects(studentProjectsToGet)
    }
    if(cardsToGet.length > 0){
      this.props.actions.cards.getCards(cardsToGet)
    }
    return featuredCardsId;
  }

  langNameToLangKey(langName){
    const langKeys = this.props.store.langs.langKeys;
    for(var i=0;i<langKeys.length;i++){
      if(langName === langKeys[i].name[0] || langName === langKeys[i].name[1] || langName === langKeys[i].name[2]){
        return langKeys[i].key;
      }
    }
    return '';
  }

  langKeyToLangName(langKey){
    const langKeys = this.props.store.langs.langKeys;
    for(var i=0;i<langKeys.length;i++){
      if(langKey === langKeys[i].key){
        return this.multiLang(langKeys[i].name[0], langKeys[i].name[1], langKeys[i].name[2]);
      }
    }
    return '';
  }

  async url(filename, type){
    const actions = this.props.actions.content;
    if(!filename){ /*console.log('no filename');*/ return ''};
    const cachedUrl = this.props.store.content.cachedUrl[filename];
    if(cachedUrl){
      /*console.log(type + ' use cached url: ' + cachedUrl);*/
      if(cachedUrl === 'processing...'){ return ''; }
      return cachedUrl;
    }
    //console.log(filename + '- create url: processing...');
    actions.cacheUrl(filename, 'processing...');
    const localFile = await this.props.db.get(filename);
    if(localFile){
      //console.log(type + ' use localFile');
      const url = URL.createObjectURL(localFile);
      //console.log(filename + '- create url: ' + url);
      actions.cacheUrl(filename, url);
      return url;
    }else{
      //console.log(type + ' downloading...');
      var downloadUrl = this.api() + '/download/'+ type + '/' + filename;
      if(filename.includes('147.8.219.237')){
        downloadUrl = this.api() + '/mlanghku/download/' + this.mlanghkuFilename(filename);
      }
      let err, res;
      [err, res] = await to(axios.get(downloadUrl, {responseType: 'blob'}));
      if(err || !res.data){ console.log('file download error!'); return '';}
      this.props.db.set(filename, res.data);
      const url = URL.createObjectURL(res.data);
      actions.cacheUrl(filename, url);
      return url;
    }
  }

  mlanghkuFilename(url){
    //console.log(url);
    const splited = url.split('/');
    const filename = splited[splited.length - 2] + '/' + splited[splited.length - 1];
    //console.log(filename);
    return filename;
  }

  downloadFile(absoluteUrl) {
    var link = document.createElement('a');
    link.href = absoluteUrl;
    link.download = 'true';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 };

  addZeroIfSingle(num){
    if(num < 10){
      return '0' + String(num);
    }else{
      return '' + String(num);
    }
  }

  dateString(date) {
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '-' + this.addZeroIfSingle(monthIndex) + '-' + this.addZeroIfSingle(day);
    //return '2018-02-08';
    return dateStr;
  }

  multiLang(english, chinese, simplified_chinese){
    switch (this.props.store.main.language) {
      case 'english':
        return english;
      case 'chinese':
        return chinese;
      case 'simplified_chinese':
        return simplified_chinese;
      default:
        return english;
    }
  }

  render() {
    const app = {
      store: this.props.store,
      actions: this.props.actions,
      database: this.props.db,
      functions: {
        getById: getById,
        checkAlert: checkAlert,

        url: this.url.bind(this),
        isDev: this.isDev.bind(this),
        randomNyan: this.randomNyan.bind(this),

        deltaDay: this.deltaDay.bind(this),
        outDated: this.outDated.bind(this),
        dateString: this.dateString.bind(this),
        multiLang: this.multiLang.bind(this),
        translateUserType: this.translateUserType.bind(this),

        langKeyToLangName: this.langKeyToLangName.bind(this),
        langNameToLangKey: this.langNameToLangKey.bind(this),

        getAllFeaturedCardsIdInViewingProject: this.getAllFeaturedCardsIdInViewingProject.bind(this)
      }
    }
    return (
      <Main app={app}/>
    );
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.props.actions.ui.setDimension({width: window.innerWidth,height: window.innerHeight});
  }

}

function mapStateToProps(state, props) {
  return { store: state }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      main: Action(main, dispatch),
      user: Action(user, dispatch),
      ui: Action(ui, dispatch),
      switches: Action(switches, dispatch),
      content: Action(content, dispatch),
      modal: Action(modal, dispatch),
      notices: Action(notices, dispatch),

      profile: Action(profile, dispatch),
      schools: Action(schools, dispatch),
      courses: Action(courses, dispatch),
      subjects: Action(subjects, dispatch),
      profiles: Action(profiles, dispatch),
      projects: Action(projects, dispatch),
      studentProjects: Action(studentProjects, dispatch),
      groups: Action(groups, dispatch),

      cards: Action(cards, dispatch),
      langs: Action(langs, dispatch),

      mlanghku: Action(mlanghku, dispatch)
    }
  }
}

function Action(action, dispatch){
  return bindActionCreators(action, dispatch)
}

function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
