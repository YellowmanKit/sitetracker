import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProjectRow from 'components/main/items/rows/ProjectRow';

class CourseProjects extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getCourseProjects();
  }

  getCourseProjects(){
    const course = this.store.courses.viewingCourse;

    const projectsToGet = [];
    const projectsToShow = course.projects;

    for(var i=0;i<projectsToShow.length;i++){
      if(this.func.getById.project(projectsToShow[i], this.store) === null){
        projectsToGet.splice(0,0, projectsToShow[i]);
      }
    }
    if(projectsToGet.length > 0){
      this.actions.projects.getProjects(projectsToGet);
    }
  }

  projectsList(){
    const projects = this.store.courses.viewingCourse.projects;
    if(projects.length === 0){
      return this.subTitle(['No region','此組別未有地區','此组别未有地区'])
    }
    return projects.slice(0).reverse().map((projectId, i)=>{
      const _project = this.func.getById.project(projectId, this.store);
      return <ProjectRow onClick={()=>{this.actions.projects.viewProject(_project); this.actions.content.pushView('project');}} app={this.app} project={_project} key={i}/>
    })
  }

  render() {
    this.init(this.props);
    //const addBtnText = ['CREATE PROJECT','創建專題研習'];

    return(
      <div style={this.subViewStyle()}>
        <div style={{...this.bs, ...this.ui.styles.list}}>
          {this.projectsList()}
        </div>
      </div>
    )
  }

}

export default CourseProjects;
