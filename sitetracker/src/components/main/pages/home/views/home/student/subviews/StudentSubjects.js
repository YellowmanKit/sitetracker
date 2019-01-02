import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import SubjectRow from 'components/main/items/rows/SubjectRow';

class StudentSubjects extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    if(!props.profile.subjects){
      this.getAllSubjectsOfUser();
    }
  }

  getAllSubjectsOfUser(){
    this.actions.subjects.getAllSubjectsOfUser(this.store.profiles.viewingProfile);
  }

  studentSubjectsList(){
    return this.props.profile.subjects.map((subjectId, i)=>{
      var subject = this.func.getById.subject(subjectId, this.store);
      return(
        <SubjectRow
        app={this.app}
        subject={subject}
        onClick={()=>{
          this.actions.subjects.viewSubject(subject);
          this.actions.content.pushView('studentSubject'); }}
        key={i}/>
      )
    })
  }

  render(){
    this.init(this.props);

    if(!this.props.profile.subjects){ return null; }
    return(
      <div style={this.subViewStyle()}>
        {this.studentSubjectsList()}
      </div>
    )
  }

}

export default StudentSubjects;
