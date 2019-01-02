import React from 'react';
import Row from './Row';

//import icon_student from 'resources/images/icons/student_grey.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';

class ProfileRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: this.props.profile? this.props.profile.icon: null,
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
    const profile = this.props.profile;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = this.bs.height * 0.05;
    const textScale = [this.bs.height * 0.05,''];
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(profile.cardCount, textScale, '175%', 'center')}
        {this.verGap('5%')}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(profile.featuredCount, textScale, '175%', 'center')}
      </div>
    )
  }

  render(){
    const profile = this.props.profile;
    if(profile === null){ return null; }
    if(profile.name === ''){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button key={this.url.url} onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity
      }}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.profile.name, this.rowInfo.bind(this) )}
      </button>
  )
}

export default ProfileRow;
