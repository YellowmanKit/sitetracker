import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProjectRow from 'components/main/items/rows/ProjectRow';

class SubjectProjects extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    this.hidePassed = this.store.switches.hide.passedProjectsRows;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.hidePassed = this.store.switches.hide.passedProjectsRows;
    this.setListScroll('subjectProjectsList');
  }

  componentDidMount(){
    this.init(this.props);
    this.getSubjectProjects();
  }

  getSubjectProjects(){
    const subject = this.store.subjects.viewingSubject;

    const projectsToGet = [];
    const projectsToShow = subject.projects;
    if(projectsToShow.length === 0 && this.store.user.type === 'teacher' && !this.inSchool){
      this.actions.content.pushHint({type:'noProject'});
    }

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
    const projects = this.store.subjects.viewingSubject.projects;
    if(projects.length === 0){
      return this.subTitle(['No location','此地區未有任何地點','此地区未有任何地点'])
    }
    return projects.slice(0).reverse().map((projectId, i)=>{
      const project = this.func.getById.project(projectId, this.store);
      if(!project){ return null; }
      if(this.hidePassed && this.func.outDated(project.endDate)){ this.hasHided = true; return null; }
      return <ProjectRow onClick={()=>{ this.actions.projects.viewProject(project); this.actions.content.pushView('project');}} app={this.app} project={project} key={i}/>
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div id={'subjectProjectsList'} onScroll={()=>{ this.onScroll('subjectProjectsList'); }} style={{...this.bs, ...this.ui.styles.list}}>
          {this.projectsList()}
          {this.hidePassed && this.hasHided && this.buttons.showHidden(()=>{ this.actions.switches.setAnimation('row', true); this.actions.switches.setHide('passedProjectsRows', false)})}
        </div>
      </div>
    )
  }

}

export default SubjectProjects;
