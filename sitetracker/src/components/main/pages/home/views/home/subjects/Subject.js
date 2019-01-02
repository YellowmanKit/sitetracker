import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import SubjectDetail from './subviews/SubjectDetail';
import SubjectProjects from './subviews/SubjectProjects';

class Subject extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    this.subject = this.store.subjects.viewingSubject;
    this.state = {}
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.subject = this.store.subjects.viewingSubject;
    this.checkViewTransition(newProps);
  }

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('subject')){
      this.actions.content.setSubView('subjectProjects');
    }
    if(this.store.user.type === 'student'){

    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}

    switch (subView) {
      case 'subjectProjects':
        return <SubjectProjects app={app}/>
      case 'subjectDetail':
        return <SubjectDetail app={app}/>
      default:
        return null;
    }
  }

  subjectSubNav(){
    const _options = [
      {
        tag:['Location','地點','地点'],
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
    const deadView = this.state.deadView;
    const view = this.state.view;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.subject.title, this.subject.title, this.subject.title])}
        {this.subjectSubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }

}

export default Subject;
