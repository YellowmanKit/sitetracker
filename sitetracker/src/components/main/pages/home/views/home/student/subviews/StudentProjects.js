import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import StudentProjectRow from 'components/main/items/rows/StudentProjectRow';

class StudentProjects extends SubView {

  studentProjectsList(){
    return this.store.subjects.viewingSubject.projects.map((projectId, i)=>{
      var project = this.func.getById.project(projectId, this.store);
      if(!project){ console.log('project is missing'); return null; };
      var studentProject = null;
      project.studentProjects.map(studentProjectId=>{
        if(this.store.profiles.viewingProfile.studentProjects.indexOf(''+studentProjectId) > -1){
          studentProject = this.func.getById.studentProject(studentProjectId, this.store);
        }
        return null;
      });
      if(!studentProject){ console.log('studentProject is missing'); return null; };
      if(studentProject.cards.length === 0){ return null; };
      return(
        <StudentProjectRow
        app={this.app}
        studentProject={studentProject}
        onClick={()=>{
          this.actions.projects.viewProject(project);
          this.actions.studentProjects.viewStudentProject(studentProject);
          this.actions.content.pushView('studentProject'); }}
        byProject={true}
        key={i}/>
      )
    })
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        {this.studentProjectsList()}
      </div>
    )
  }

}

export default StudentProjects;
