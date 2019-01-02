import React from 'react';
import Row from './Row';

class SchoolRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: this.props.school? this.props.school.icon: null,
      type: 'schoolIcon'
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(newProps.school && !this.state.filename){
      this.setState({
        filename: newProps.school.icon,
        type: 'schoolIcon'
      })
    }
    this.checkUrl();
  }

  rowInfo(){
    const school = this.props.school;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'flex-end'
    }}
    return(
      <div style={rowStyle}>
        {this.textDisplay(school.description, ['',''], '150%')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    if(this.props.school === null){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity
      }}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.school.name, this.rowInfo.bind(this))}
      </button>
  )
}

export default SchoolRow;
