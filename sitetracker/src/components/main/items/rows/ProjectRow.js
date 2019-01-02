import React from 'react';
import Row from './Row';

import icon_event from 'resources/images/icons/event_grey.png';

class ProjectRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: this.props.project? this.props.project.icon: null,
      type: 'projectIcon',
      alert: this.func.checkAlert.project(this.props.project, this.props.app)
    }
    this.outDated = this.func.outDated(this.props.project.endDate);
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(newProps.project && !this.state.filename){
      this.setState({
        filename: newProps.project.icon,
        type: 'projectIcon'
      }, ()=>{ this.checkUrl(); })
    }
  }

  rowInfo(){
    const project = this.props.project;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'flex-end'
    }}
    const iconSize = this.bs.height * 0.05;
    return(
      <div style={rowStyle}>
        {this.icon(icon_event, [iconSize, iconSize])}
        {this.verGap('1%')}
        {this.textDisplay(this.func.dateString(new Date(project.endDate)), ['',''], '150%')}
      </div>
    )
  }

  render(){
    if(this.props.project === null){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity * this.outDated? 0.5:1
      }}}>
        {this.verGap('3%')}
        {this.rowIcon(this.outDated)}
        {this.rowContent(this.props.project.title, this.rowInfo.bind(this))}
        {this.state.alert && this.alertTag()}
      </button>
  )
}

export default ProjectRow;
