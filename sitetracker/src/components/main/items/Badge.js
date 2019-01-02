import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import empty from 'resources/images/general/empty.png';
import badge_failed from 'resources/images/icons/badges/badge_corner_failed.png';
import badge_passed from 'resources/images/icons/badges/badge_corner_passed.png';
import badge_featured from 'resources/images/icons/badges/badge_corner_featured.png';


class Badge extends UI {

  constructor(props){
    super(props);
    this.state = {
      grade: props.grade,
      deadGrade: null
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.setState({
      grade: newProps.grade,
      deadGrade: this.state.grade !== newProps.grade? this.state.grade: this.state.deadGrade
    });
  }

  render(){
    this.init(this.props);
    const badges = [
      {grade: this.state.grade, dead: false},
      {grade: this.state.deadGrade, dead: true}
    ];

    return(
      badges.map((badge, i)=>{ return this.badge(i, badge.grade, badge.dead) })
    )
  }

  badge(index, grade, dead){
    const ani = this.store.switches.animation.badge;
    const scale = this.props.scale;
    const badgeStyle = {
      width: scale[0],
      height: scale[1],
      position: 'absolute',
      top: -2,
      right: -2
    }
    const icon =
    grade === 'notGraded'? empty:
    grade === 'failed'? badge_failed:
    grade === 'passed'? badge_passed:
    grade === 'featured'? badge_featured:
    empty;

    const isOpen = !dead;
    const startPosi = !ani? -2: -20;
    const endPosi = !ani? -2: -2;
    const startOpacity = !ani? 1: 0;
    const endOpacity = !ani? 1: 1.1;
    return(
      <Motion key={index + grade + dead} defaultStyle={{top: isOpen? startPosi: endPosi, right: isOpen? startPosi: endPosi, opacity: isOpen? startOpacity: endOpacity}}
      style={{top: isOpen?spring(endPosi):spring(startPosi), right: isOpen?spring(endPosi):spring(startPosi), opacity: isOpen?spring(endOpacity):spring(startOpacity)}}>
        {style=>(
          <img style={{...badgeStyle, ...{top: style.top, right: style.right, opacity: style.opacity}}} src={icon} alt=''/>
        )}
      </Motion>
    )
  }

}

export default Badge;
