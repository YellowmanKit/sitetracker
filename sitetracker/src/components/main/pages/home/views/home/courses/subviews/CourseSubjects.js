import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import SubjectRow from 'components/main/items/rows/SubjectRow';

class CourseSubjects extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getCourseSubjects();
    this.setListScroll('courseSubjectsList');
  }

  getCourseSubjects(){
    const course = this.store.courses.viewingCourse;

    const subjectsToGet = [];
    const subjectsToShow = course.subjects;
    if(subjectsToShow.length === 0 && this.store.user.type === 'teacher' && !this.inSchool){
      this.actions.content.pushHint({type:'noSubject'});
    }

    for(var i=0;i<subjectsToShow.length;i++){
      if(this.func.getById.subject(subjectsToShow[i], this.store) === null){
        subjectsToGet.push(subjectsToShow[i]);
      }
    }

    if(subjectsToGet.length > 0){
      this.actions.subjects.getSubjects(subjectsToGet);
    }
  }

  subjectsList(){
    const subjects = this.store.courses.viewingCourse.subjects;
    if(subjects.length === 0){
      return this.subTitle(['No region','此組別未有地區','此组别未有地区'])
    }
    return subjects.slice(0).reverse().map((subjectId, i)=>{
      const subject = this.func.getById.subject(subjectId, this.store);
      if(!subject){ return null; }
      return <SubjectRow onClick={()=>{this.actions.subjects.viewSubject(subject); this.actions.content.pushView('subject');}} app={this.app} subject={subject} key={i}/>
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div id={'courseSubjectsList'} onScroll={()=>{ this.onScroll('courseSubjectsList'); }} style={{...this.bs, ...this.ui.styles.list}}>
          {this.subjectsList()}
        </div>
      </div>
    )
  }

}

export default CourseSubjects;
