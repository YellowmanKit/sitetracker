import React from 'react';
import Row from './Row';

import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';
import trophy from 'resources/images/icons/trophy.png';

//import crown_gold from 'resources/images/icons/crown_gold.png';
//import crown_silver from 'resources/images/icons/crown_silver.png';
//import crown_bronze from 'resources/images/icons/crown_bronze.png';

class RankingRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.profile = this.func.getById.profileByUser(this.props.data.student, this.store);
    this.state = {
      filename: this.props.data? this.profile.icon: null,
      type: 'profileIcon'
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(newProps.profile && !this.state.filename){
      this.setState({
        filename: newProps.profile.icon,
        type: 'profileIcon'
      })
    }
    this.checkUrl();
  }

  rowInfo(){
    const data = this.props.data;
    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'flex-end'
    }}
    const iconSize = this.bs.height * 0.05;
    const textScale = [this.bs.height * 0.05,''];
    const fontSize = this.bs.height * 0.035;
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(data.total, textScale, fontSize, 'center')}
        {this.verGap('5%')}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(data.featured, textScale, fontSize, 'center')}
        {this.verGap('5%')}
        {this.icon(trophy, [iconSize, iconSize], 0.2)}
        {this.textDisplay(data.score, textScale, fontSize, 'center')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    if(this.props.data === null){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <div style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity,
        cursor: ''
      }}}>
        {this.textDisplay((this.props.index + 1) + '.', [this.bs.height * 0.05,''], '200%', 'center', this.props.index === 0? 'gold':this.props.index === 1?'silver': this.props.index === 2? '#CD7F32': 'black')}
        {this.rowIcon()}
        {this.rowContent(this.profile.name, this.rowInfo.bind(this))}
      </div>
  )
}

export default RankingRow;
