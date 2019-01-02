import React from 'react';
import View from 'components/main/pages/home/views/View';
import SubNav from 'components/main/items/SubNav';

import SubjectDetail from '../subjects/subviews/SubjectDetail';
import StudentProjects from '../student/subviews/StudentProjects';

class StudentSubject extends View {

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('subject')){
      this.actions.content.setSubView('subjectProjects');
    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}

    switch (subView) {
      case 'subjectProjects':
        return <StudentProjects app={app}/>
      case 'subjectDetail':
        return <SubjectDetail app={app}/>
      default:
        return null;
    }
  }

  studentSubNav(){
    const _options = [
      {
        tag:['Projects','專題研習','专题研习'],
        subView: 'subjectProjects'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'subjectDetail'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    const title = this.store.subjects.viewingSubject.title;

    const deadView = this.state.deadView;
    const view = this.state.view;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([title, title, title])}
        {this.studentSubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }

}

export default StudentSubject;
