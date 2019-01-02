import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import Profile from './subviews/Profile';
import StudentSubjects from './subviews/StudentSubjects';

class Student extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    this.profile = this.store.profiles.viewingProfile;

    this.state = {}
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.profile = this.store.profiles.viewingProfile;

    this.checkViewTransition(newProps);
  }

  componentDidMount(){
    this.init(this.props);
    if(this.store.content.subView.includes('subject')){
      this.actions.content.setSubView('studentSubjects');
    }else if(!this.store.content.subView.includes('student')){
      this.actions.content.setSubView('studentProfile');
    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}

    switch (subView) {
      case 'studentProfile':
        return <Profile app={app} profile={this.profile}/>
      case 'studentSubjects':
        return <StudentSubjects app={app} profile={this.profile}/>
      default:
        return null;
    }
  }

  studentSubNav(){
    const _options = [
      {
        tag:['Profile','個人檔案','个人档案'],
        subView: 'studentProfile'
      },
      {
        tag:['Region','地區','地区'],
        subView: 'studentSubjects'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);

    const deadView = this.state.deadView;
    const view = this.state.view;

    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.profile.name, this.profile.name, this.profile.name])}
        {this.studentSubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }

}

export default Student;
