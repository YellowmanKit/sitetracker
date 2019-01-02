import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import CourseRow from 'components/main/items/rows/CourseRow';

class TeacherCourses extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    if(!props.profile.teachingCourses){
      this.getAllCoursesOfUser();
    }
    this.hidePassed = this.store.switches.hide.passedCoursesRows;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.hidePassed = this.store.switches.hide.passedCoursesRows;
  }

  getAllCoursesOfUser(){
    this.actions.courses.getAllTeachingCoursesOfUser(this.store.profiles.viewingTeacherProfile);
  }

  teacherCoursesList(){
    return this.props.profile.teachingCourses.map((courseId, i)=>{
      var course = this.func.getById.course(courseId, this.store);
      if(this.hidePassed && this.func.outDated(course.endDate)){ this.hasHided = true; return null; }
      return(
        <CourseRow
        app={this.app}
        course={course}
        onClick={()=>{
          this.actions.courses.viewCourse(course);
          this.actions.content.pushView('course'); }}
        key={i}/>
      )
    })
  }

  render(){
    this.init(this.props);

    if(!this.props.profile.teachingCourses){ return null; }
    return(
      <div style={this.subViewStyle()}>
        {this.teacherCoursesList()}
        {this.hidePassed && this.hasHided && this.buttons.showHidden(()=>{ this.actions.switches.setAnimation('row', true); this.actions.switches.setHide('passedCoursesRows', false)})}
      </div>
    )
  }

}

export default TeacherCourses;
