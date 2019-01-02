import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import Profile from '../student/subviews/Profile';
import TeacherCourses from './subviews/TeacherCourses';

class Teacher extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    this.profile = this.store.profiles.viewingTeacherProfile;
    this.state = {};
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.profile = this.store.profiles.viewingTeacherProfile;
    this.checkViewTransition(newProps);
  }

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('teacher')){
      this.actions.content.setSubView('teacherCourses');
    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}

    switch (subView) {
      case 'teacherProfile':
        return <Profile app={app} profile={this.profile}/>
      case 'teacherCourses':
        return <TeacherCourses app={app} profile={this.profile}/>;
      default:
        return null;
    }
  }

  teacherSubNav(){
    const options = [
      {
        tag:['Team','小隊','小队'],
        subView: 'teacherCourses'
      },
      {
        tag:['Profile','個人檔案','个人档案'],
        subView: 'teacherProfile'
      }
    ]
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const deadView = this.state.deadView;
    const view = this.state.view;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.profile.name, this.profile.name, this.profile.name])}
        {this.teacherSubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }

}

export default Teacher;
