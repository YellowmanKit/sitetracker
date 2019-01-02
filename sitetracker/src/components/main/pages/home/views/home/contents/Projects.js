import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Projects extends UI {

  projects(){
    const areaStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.57,
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'auto'
    }}
    return(
      <div style={areaStyle}>
        {this.projectsCells()}
      </div>
    )
  }

  projectsCells(){
    const projects =
    this.store.user.type === 'teacher'? this.store.projects.teachingProjects:
    this.store.user.type === 'student'? this.store.projects.joinedProjects:
    [];

    var projectsData = [];
    projects.map(id=>{
      return projectsData.push(this.func.getById.project(id, this.store));
    })
    const containerStyle = {...this.ui.styles.container, ...{
      width: this.bs.width * 0.275,
      height: this.bs.width * 0.3
    }}
    return projectsData.map((project, i)=>{
      return(
        <div key={i} style={containerStyle}>
          <Cell app={this.app}
          type={'project'}
          data={project}
          onClick={()=>{ this.clearAlert(project); this.actions.projects.viewProject(project._id); this.actions.content.pushView('project'); }}/>
        </div>
      )
    });
  }

  render() {
    this.init(this.props);

    const title = ['Projects','專題研習','专题研习'];

    const containerStyle = {
      width: '100%',
      height: this.bs.height * 0.62,
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title)}
        {this.projects()}
      </div>
    )
  }
}

export default Projects;
