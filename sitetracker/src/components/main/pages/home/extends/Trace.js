import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import Nyan from 'components/main/Nyan';

class Trace extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      nyan: 'sit',
      tracesLength: 0
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const tracesLength = this.store.content.traces.length;
    var action = 'sit';
    if(tracesLength < this.state.tracesLength){ action = 'runningDown'; }
    if(tracesLength > this.state.tracesLength){ action = 'runningUp'; }
    if(tracesLength !== this.state.tracesLength && this.state.nyan !== action){
      this.setState({nyan: action, tracesLength: tracesLength});
      setTimeout(()=>{this.setState({nyan:'sit'})},500);
    }
  }

  render(){
    this.init(this.props);

    const view = this.store.content.view;
    if(view && view.includes('Home')){ return null; }

    const toShow = ['admin','school', 'teacher','student','course','subject','studentSubject','project','studentProject'];
    if(!toShow.includes(view)){ return null; }
    const traceStyle = {...this.ui.styles.container, ...{
      display: 'flex',
      justifyContent: 'flex-start',
      flexFlow: 'column nowrap',
      position: 'absolute',
      right: this.bs.height * 0.01,
      bottom: this.bs.height * 0.01
    }}
    const previousViews = this.store.content.previousViews;
    const nyanSize = [this.bs.height * 0.05, this.bs.height * 0.05];
    const hided = this.store.switches.hide.trace;

    return(
      <div style={traceStyle}>
        <Nyan app={this.app} status={this.state.nyan} size={nyanSize} onClick={()=>{ setTimeout(()=>{this.setState({nyan:'sit'})},500); this.setState({nyan: hided?'runningUp':'runningDown'}); this.actions.switches.toggleHide('trace')}} />
        {this.store.content.traces.map((view, i)=>{
          return this.traceCell(view, i);
        })}
        {previousViews.length > 0 && previousViews.slice().reverse().map(view =>{return this.traceCell(view, -1, true)}) }
      </div>
    )
  }

  traceCell(view, index, dead){
    const hide = this.store.switches.hide.trace;
    const isTitle = index === 0;
    const cellHeight = this.bs.height * 0.0275;
    const marginTop =  this.bs.height * 0.0075;

    const cellStyle = {...this.ui.styles.border, ...this.ui.styles.container, ...{
      width: this.bs.height * 0.2,
      backgroundColor: 'white',
      borderRadius: this.bs.height * 0.01,
      overflow: 'hidden',
      cursor: 'pointer',
      pointerEvents: hide? 'none':''
    }}
    const textStyle = {
      width: this.bs.height * 0.2,
      height: cellHeight,
      fontSize: '100%',
      textAlign: 'center',
      overflow: 'hidden'
    }
    const text =
    isTitle? this.func.multiLang('Home','主頁','主页'):
    view === 'school'? this.store.schools.viewingSchool.name:
    view === 'admin'? this.store.profiles.viewingAdminProfile.name:
    view === 'teacher'? this.store.profiles.viewingTeacherProfile.name:
    view === 'student'? this.store.profiles.viewingProfile.name:
    view === 'course'? this.store.courses.viewingCourse.title:
    view === 'subject'? this.store.subjects.viewingSubject.title:
    view === 'studentSubject'? this.store.subjects.viewingSubject.title:
    view === 'project'? this.store.projects.viewingProject.title:
    view === 'studentProject'? this.store.projects.viewingProject.title:
    '';
    const onClick =
    isTitle? ()=>{   this.actions.content.backToHome(); }:
    ()=>{
      for(var i=0;i<(this.store.content.traces.length - index - 1);i++){
        this.actions.content.pullView();
      }
    };

    return(
      <Motion key={view} defaultStyle={{opacity: dead? 1:0, height: dead? cellHeight: 0, marginTop: dead? marginTop:0}}
      style={{opacity: dead? spring(0): hide?spring(0): spring(1.1), height: dead? spring(0): hide? spring(0):spring(cellHeight), marginTop: dead? spring(0):(hide && !isTitle)?spring(0): spring(marginTop)}}>
        {style=>(
          <div style={{...cellStyle, ...{opacity: style.opacity, height: style.height, marginTop: style.marginTop}}} onClick={onClick}>
            <div style={textStyle}>
              {text}
            </div>
          </div>
        )}
      </Motion>
    )
  }
}

export default Trace;
