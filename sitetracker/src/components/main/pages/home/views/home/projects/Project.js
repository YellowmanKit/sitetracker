import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import ProjectDetail from './subviews/ProjectDetail';
import SubmittedCards from './subviews/SubmittedCards';
import StudentProjects from './subviews/StudentProjects';
import ProjectFeatured from './subviews/ProjectFeatured';
import ProjectRanking from './subviews/ProjectRanking';

import StudentGroup from './subviews/group/student/StudentGroup';
import TeacherGroup from './subviews/group/teacher/TeacherGroup';

class Project extends View {

  componentDidMount(){
    this.init(this.props);
    const subView = this.store.content.subView;
    if(!subView.includes('project')){
      this.actions.content.setSubView(
        (this.inSchool || this.store.projects.viewingProject.mlanghku)? 'projectFeatured':
        subView.includes('student')? 'projectGroup':
        'projectSubmitted');
    }
    this.getStudentProjects(this.props);
  }

  getStudentProjects(props){
    const viewingProject = this.store.projects.viewingProject;

    if(viewingProject.mlanghku && !viewingProject.fetched){
      this.actions.mlanghku.fetchStudentProjects(viewingProject);
      return;
    }

    const studentProjectsToGet = [];
    const studentProjectsToShow = viewingProject.studentProjects;

    for(var i=0;i<studentProjectsToShow.length;i++){
      if(this.func.getById.studentProject(studentProjectsToShow[i], this.store) === null){
        studentProjectsToGet.splice(0,0, studentProjectsToShow[i]);
      }
    }
    if(studentProjectsToGet.length > 0){
      this.actions.studentProjects.getStudentProjects(studentProjectsToGet);
    }

  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}
    const type = this.store.user.type;

    switch (subView) {
      case 'projectDetail':
        return <ProjectDetail app={this.app}/>
      case 'projectSubmitted':
        return(
          type === 'student'? <SubmittedCards app={app}/>:
          type === 'teacher'? <StudentProjects app={app}/>:
          null
        )
      case 'projectRanking':
        return <ProjectRanking app={app}/>
      case 'projectFeatured':
        return <ProjectFeatured app={app}/>
      case 'projectGroup':
      return(
        type === 'student'? <StudentGroup app={app}/>:
        type === 'teacher'? <TeacherGroup app={app}/>:
        null
      )
      default:
        return null;
    }
  }

  projectSubNav(){
    const options = [
      {
        tag:['Card','卡片','卡片'],
        subView: 'projectFeatured'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'projectDetail'
      }
    ];
    if(!this.store.projects.viewingProject.mlanghku){
      options.splice(1,0,
      {
        tag:['Group','小組','小组'],
        subView: 'projectGroup'
      });
    }
    if(this.store.projects.viewingProject.mlanghku){
      options.splice(1,1);
    }
    if(!this.inSchool && !this.store.projects.viewingProject.mlanghku){
      options.splice(0,0,
      {
        tag:['Submitted','已提交','已提交'],
        subView: 'projectSubmitted'
      });
    }
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const project = this.store.projects.viewingProject;

    const deadView = this.state.deadView;
    const view = this.state.view;

    const title = project.title;

    return(
      <div style={this.viewStyle()}>
        {this.tabBar([title, title, title])}
        {this.projectSubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }
}

export default Project;
