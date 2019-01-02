import React from 'react';
import UI from 'components/UI';

import Pages from './pages/Pages';
import Modal from './Modal';
import Recording from './Recording';

import background from 'resources/images/general/background.png';

class Main extends UI {

  componentDidMount(){
    this.init(this.props);
    //localStorage.clear();
    //this.db.clear();
    this.actions.main.setStatus('waitForLogin');
    //actions.main.setStatus('ready');
  }

  fetchaAppData(){
    const appId = this.store.user.mlanghkuId;
    const appPw = this.store.user.mlanghkuPw;
    //console.log(this.store.user);
    if(appId && appPw){ this.actions.mlanghku.fetchUser(appId, appPw); }
  }

  componentWillReceiveProps(newProps){
    this.init(this.props);
    const previous = this.app.store.main.status;
    const next = newProps.app.store.main.status;
    const lastView = this.app.store.content.view;
    const newView = newProps.app.store.content.view;
    const oldUser = this.props.app.store.user;
    const newUser = newProps.app.store.user;
    //console.log(previous);
    //console.log(next);
    if((previous === 'waitForLogin' || previous === 'getNewAccount') && next === 'ready'){
      this.fetchaAppData();
      this.rememberLoginInfo(newUser.id, newUser.pw);
      //console.log(JSON.parse(localStorage.getItem('loginInfo')).id);
      this.initView(this.app.store.user.type);
    }else if(lastView === 'forceProfile' && newView !== 'forceProfile'){
      this.actions.content.pushView('forceAccount');
    }
    if(oldUser.pw !== newUser.pw){
      this.rememberLoginInfo(newUser.id, newUser.pw);
    }

    const oldType = this.app.store.user.type;
    const newType = newProps.app.store.user.type;
    if(oldType !== newType){
      this.app.actions.content.clearView();
      this.initView(newType);
    }
  }

  rememberLoginInfo(id, pw){
    //localStorage.setItem('loginInfo', JSON.stringify({id: id, pw: pw}));
    this.db.set('loginInfo',{id: id, pw: pw});
    this.db.set('language',this.store.main.language);
  }

  initView(type){
    const length = this.store.content.traces.length;
    for(var i=0;i<length;i++){
      this.actions.content.pullView();
    }

    const initView =
    type === 'student'? 'studentHome':
    type === 'teacher'? 'teacherHome':
    type === 'admin'? 'adminHome':
    type === 'developer'? 'devHome':
    '';
    this.actions.content.pushView(initView);

    const name = this.store.profile.name;
    if(!name || name === ''){ this.actions.content.pushView('forceProfile'); }
  }

  render() {
    this.init(this.props);

    const mainStyle = {
      width: this.ui.windowWidth * 0.9999,
      height: this.ui.windowHeight * 0.9999,
      minHeight: this.bs.height,
      backgroundImage: 'url(' + background + ')',
      backgroundSize: '10% 10%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',

      boxSizing: 'border-box',
      overflow: 'hidden'
    }
    return (
      <div style={mainStyle}>
        <Pages app={this.app}/>
        <Recording app={this.app}/>
        <Modal app={this.app}/>
      </div>
    )
  }

}

export default Main;
