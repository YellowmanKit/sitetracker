import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import CourseDetail from './subviews/CourseDetail';
import CourseStudents from './subviews/CourseStudents';
//import CourseProjects from './subviews/CourseProjects';
import CourseSubjects from './subviews/CourseSubjects';

class Course extends View {

  componentDidMount(){
    if(this.store.content.subView.includes('student')){
      this.actions.content.setSubView('courseStudents');
    }else if(this.store.content.subView.includes('subject')){
      this.actions.content.setSubView('courseSubjects');
    }else if(!this.store.content.subView.includes('course')){
      this.actions.content.setSubView('courseSubjects');
    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}
    switch (subView) {
      case 'courseDetail':
        return <CourseDetail app={app}/>
      case 'courseStudents':
        return <CourseStudents app={app}/>
      case 'courseSubjects':
        return <CourseSubjects app={app}/>
      default:
        return null;
    }
  }

  courseSubNav(){
    const options = [
      {
        tag:['Region','地區','地区'],
        subView: 'courseSubjects'
      },
      {
        tag:['Member','組員','组员'],
        subView: 'courseStudents'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'courseDetail'
      }
    ]
    if(this.store.courses.viewingCourse.mlanghku){
      options.splice(1,1);
    }
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const course = this.store.courses.viewingCourse;

    const deadView = this.state.deadView;
    const view = this.state.view;

    return(
      <div style={this.viewStyle()}>
        {this.tabBar([course.title,course.title,course.title])}
        {this.courseSubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }
}

export default Course;
