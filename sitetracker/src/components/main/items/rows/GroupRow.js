import React from 'react';
import Row from './Row';

import icon_student from 'resources/images/icons/student_grey.png';

class GroupRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    const leaderProfile = this.func.getById.profileByUser(this.props.group.leader, this.store);
    this.state = {
      filename: leaderProfile? leaderProfile.icon: null,
      type: 'profileIcon'
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(newProps.profile && !this.url.url){
      this.setState({
        filename: newProps.profile.icon,
        type: 'profileIcon'
      })
    }
    this.checkUrl();
  }

  rowInfo(){
    const group = this.props.group;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = this.bs.height * 0.05;
    const textScale = [this.bs.height * 0.05,''];
    return(
      <div style={rowStyle}>
        {this.icon(icon_student, [iconSize, iconSize])}
        {this.textDisplay(group.members.length, textScale, '175%', 'center', null, 'memberCount')}
      </div>
    )
  }

  render(){
    const group = this.props.group;
    if(group === null){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button key={this.url.url} onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity
      }}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.group.name, this.rowInfo.bind(this) )}
      </button>
  )
}

export default GroupRow;
