import React from 'react';
import Content from './Content';

import SubjectCell from 'components/main/items/cells/SubjectCell';
import ProjectCell from 'components/main/items/cells/ProjectCell';

class Subjects extends Content {

  componentDidMount(){
    this.init(this.props);
    this.setData();
    if(this.subjectsData.length === 0 && !this.store.switches.hide.subjects){
      this.actions.switches.setHide('subjects', true)
    }
  }

  setData(){
    this.subjects =
    this.store.user.type === 'teacher'? this.store.subjects.teachingSubjects:
    this.store.user.type === 'student'? this.store.subjects.joinedSubjects:
    [];

    this.subjectsData = [];
    for(var i=0;i<this.subjects.length;i++){
      const subject = this.func.getById.subject(this.subjects[i], this.store);
      this.subjectsData.push(subject);

      var projectCount = 0;
      for(var j=0;j<subject.projects.length;j++){
        const project = this.func.getById.project(subject.projects[j], this.store);
        if(!project || this.func.outDated(project.endDate)){ continue; }
        this.subjectsData.push({isProject: true, project: project});
        projectCount++;
      }
      if(projectCount > 0){
        this.subjectsData.push({ expend: true, subject: subject._id });
      }else{
        var index = this.subjectsData.indexOf(subject);
        if (index > -1) { this.subjectsData.splice(index, 1); }
      }
    }
  }

  content = style =>(
    <div style={{...this.ui.styles.areaY,
      ...{ height: style.height, opacity: style.opacity}}}>
      {this.subjectsCells()}
    </div>
  )

  subjectsCells(){
    this.setData();
    const containerStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.25,
      height: this.bs.height * 0.25
    }}

    var subjectsData = this.subjectsData;
    var lastCourse = '';
    for(var i=0;i<subjectsData.length;i++){
      if(subjectsData[i].expend || subjectsData[i].isProject){ continue; }
      if(subjectsData[i].course !== lastCourse){
        lastCourse = subjectsData[i].course;
        const course = this.func.getById.course(lastCourse, this.store)
        subjectsData.splice(i,0,{isTitle: true, title: course.title});
      }
    }

    return subjectsData.map((subject, i)=>{
      if(subject.isTitle){
        return this.courseTitle(subject.title)
      }
      if(subject.expend){
        const hide = this.store.switches.hide[subject.subject];
        if(hide){ return null; }
        return this.buttons.cellExpend(
          subject.subject,
          hide,
          ()=>{ this.actions.switches.toggleHide(subject.subject); });
      }
      if(subject.isProject){
        const hide = this.store.switches.hide[subject.project.subject];
        if(!hide){ return null; }
        return(
          <div key={i} style={{...containerStyle, ...{width: ''}}}>
            <ProjectCell app={this.app}
            data={subject.project}
            hide={!hide}
            wasHide={true}
            onClick={()=>{ this.actions.projects.viewProject(subject.project); this.actions.content.pushView('project'); }}/>
          </div>
        )
      }
      return(
        <div key={i} style={containerStyle}>
          <SubjectCell app={this.app}
          data={subject}
          onClick={()=>{ this.actions.subjects.viewSubject(subject); this.actions.content.pushView('subject'); }}/>
        </div>
      )
    });
  }

  courseTitle(title){
    const titleStyle = {...this.ui.styles.containerY, ...{
      width: this.bs.height * 0.04,
      height: this.bs.height * 0.25,
      overflow: 'hidden'
    }}
    const textStyle = {
      width: this.bs.height * 0.04,
      color: 'rgba(0,0,0,0.25)',
      fontSize: this.bs.height * 0.025,
      textAlign: 'center',
      textOverflow: 'ellipsis'
    }
    return(
      <div key={title} style={titleStyle}>
        {this.verSep('rgba(0,0,0,0.25)','32.5%')}
          <div style={textStyle}>
            {title}
          </div>
        {this.verSep('rgba(0,0,0,0.25)','32.5%')}
      </div>
    )
  }

  render() {
    this.init(this.props);
    const hide = this.store.switches.hide.subjects;

    const title = ['Region','地區','地区'];

    const containerStyle = {
      width: '100%',
      height: '',
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.switches.toggleHide('subjects')})}
        {this.animatedContent('subjects', this.content.bind(this), !hide, this.bs.height * 0.77)}
      </div>
    )
  }
}

export default Subjects;
