import React from 'react';
import Content from './Content';

import SchoolCell from 'components/main/items/cells/SchoolCell';

class Schools extends Content {

  constructor(props){
    super(props);
    this.init(props);
    this.setData();
  }

  componentDidMount(){
    this.init(this.props);
    if(this.schoolsData.length === 0 && !this.store.switches.hide.schools){
      this.setHint();
    }
    if(this.store.user.type === 'admin'){
      this.actions.switches.setHide('schools', false);
    }
  }

  setHint(){
    const toShow = this.store.profile.joinedCourses.length === 0;
    if(toShow){
      this.actions.content.pushHint({type:'schools'});
    }
  }

  setData(){
    this.schools =
    this.store.user.type === 'admin'? this.store.schools.supervisingSchools:
    this.store.user.type === 'teacher'? this.store.profile.joinedSchools:
    this.store.user.type === 'student'? this.store.profile.joinedSchools:
    [];

    this.schoolsData = [];
    this.schools.map(id=>{
      return this.schoolsData.push(this.func.getById.school(id, this.store));
    })
  }

  content = style =>(
    <div style={{...this.areaStyle(), ...{ height: style.height, opacity: style.opacity}}}>
      {this.verGap('2%')}
      {this.schoolCells()}
      {this.verGap('5%')}
      {this.schoolsData.length === 0 && this.buttons.cellAdd(this.onAdd)}
      {this.verGap('5%')}
    </div>
  )

  schoolCells(){
    return this.schoolsData.map((school, i)=>{
      return(
        <SchoolCell key={i} app={this.app}
        data={school}
        onClick={()=>{ this.actions.schools.viewSchool(school); this.actions.content.pushView('school'); }}/>
      )
    });
  }

  render() {
    this.init(this.props);
    //this.isInit = this.store.switches.hide.schools === 'init';
    const hide = this.store.switches.hide.schools;
    //const type = this.store.user.type;
    const title =
    this.store.user.type === 'admin'? ['Organization - created','組織 - 已創建','组织 - 已创建']:
    ['Organization - joined','組織 - 已加入','组织 - 已加入'];

    const containerStyle = {
      width: '100%',
      height: '',
      background: this.ui.colors.gradientBasic
    }

    this.onAdd =
    this.store.user.type === 'admin'? ()=>{this.actions.content.pushView('addSchool')}:
    this.store.user.type === 'teacher'? ()=>{this.actions.content.pushView('joinSchool')}:
    this.store.user.type === 'student'? ()=>{this.actions.content.pushView('joinSchool')}:
    ()=>{};

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.switches.toggleHide('schools')})}
        {this.animatedContent('schools', this.content.bind(this), !hide, this.bs.height * 0.27)}
      </div>
    )
  }
}

export default Schools;
