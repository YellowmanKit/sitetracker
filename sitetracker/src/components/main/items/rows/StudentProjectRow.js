import React from 'react';
import Row from './Row';

//import icon_student from 'resources/images/icons/student_grey.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';
import alert from 'resources/images/icons/alert_black.png';

class StudentProjectRow extends Row {

  constructor(props){
    super(props);
    this.init(props);

    const profile = this.func.getById.profileByUser(props.studentProject.student, this.store);
    const project = this.func.getById.project(props.studentProject.project, this.store);
    this.state = {
      filename: (props.byStudent && profile)? profile.icon:(props.byProject && project)? project.icon: null,
      type: (props.byStudent && profile)? 'profileIcon':(props.byProject && project)? 'projectIcon': ''
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const profile = this.func.getById.profileByUser(newProps.studentProject.student, this.store);
    const project = this.func.getById.project(newProps.studentProject.project, this.store);
    if(!this.state.filename){
      this.setState({
        filename: (newProps.byStudent && profile)? profile.icon:(newProps.byProject && project)? project.icon: null,
        type: (newProps.byStudent && profile)? 'profileIcon':(newProps.byProject && project)? 'projectIcon': ''
      })
      this.checkUrl();
    }
  }

  rowInfoStudent(){
    const studentProject = this.props.studentProject;
    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = this.bs.height * 0.05;
    const textScale = [this.bs.height * 0.05,''];
    const fontSize = this.bs.height * 0.035;
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(studentProject.total, textScale, fontSize, 'center')}
        {this.verGap('5%')}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(studentProject.featured, textScale, fontSize, 'center')}
        {this.verGap('5%')}
        {this.icon(alert, [iconSize, iconSize], 0.2)}
        {this.textDisplay(studentProject.alert, textScale, fontSize, 'center', studentProject.alert === 0? 'black':'red')}
      </div>
    )
  }

  rowInfoProject(){
    const studentProject = this.props.studentProject;
    const project = this.func.getById.project(studentProject.project, this.store);

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const textScale = ['100%',this.bs.height * 0.06];
    return(
      <div style={rowStyle}>
        {this.textDisplay(project.description, textScale, '125%', 'left')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    const studentProject = this.props.studentProject;
    if(studentProject.cards.length === 0){ return null; }

    this.profile = this.func.getById.profileByUser(studentProject.student, this.store);
    this.project = this.func.getById.project(studentProject.project, this.store);
    if(!studentProject || !this.profile){
      console.log(studentProject);
      console.log(this.profile);
      console.log('studentProject or profile missing')
      return null;
    }

    if(this.store.content.view === 'project' && this.store.content.subView === 'projectSubmitted' && studentProject.student === this.store.user._id){
      return null;
    }

    this.title =
    this.props.byStudent? this.profile.name:
    this.props.byProject? this.project.title:
    '';

    this.info =
    this.props.byStudent? this.rowInfoStudent.bind(this):
    this.props.byProject? this.rowInfoProject.bind(this):
    '';

    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button onClick={()=>{ this.actions.content.setSubView('projectFeatured'); }} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity
      }}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.profile && this.rowContent(this.title, this.info )}
      </button>
  )
}

export default StudentProjectRow;
