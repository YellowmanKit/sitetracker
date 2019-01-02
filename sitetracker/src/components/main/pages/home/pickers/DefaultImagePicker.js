import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import PickerOption from './PickerOption';

import avatar1 from 'resources/images/default/profile/avatar1.png';
import avatar2 from 'resources/images/default/profile/avatar2.png';
import avatar3 from 'resources/images/default/profile/avatar3.png';
import avatar4 from 'resources/images/default/profile/avatar4.png';

import ycis from 'resources/images/default/school/ycis.jpg';
import nsm from 'resources/images/default/school/nsm.jpg';
import stcc from 'resources/images/default/school/stcc.jpg';
import yckss from 'resources/images/default/school/yckss.png';

import A from 'resources/images/default/course/A.png';
import B from 'resources/images/default/course/B.png';
import C from 'resources/images/default/course/C.png';
import D from 'resources/images/default/course/D.png';
import E from 'resources/images/default/course/E.png';
import F from 'resources/images/default/course/F.png';
import G from 'resources/images/default/course/G.png';
import H from 'resources/images/default/course/H.png';

//import idol from 'resources/images/default/subject/idol.png';
//import animal from 'resources/images/default/subject/animal.png';
//import family from 'resources/images/default/subject/family.jpg';
import hongkong from 'resources/images/default/subject/hongkong.png';

import hki from 'resources/images/default/subject/hkisland.png';
import kl from 'resources/images/default/subject/kowloon.jpg';
import nt from 'resources/images/default/subject/nt.jpg';

class DefaultImagePicker extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      defaultImages: {
        avatars: [[avatar1, avatar2, avatar3, avatar4]],
        schools: [[ycis, nsm, stcc, yckss]],
        alphabet: [[A, B, C, D], [E, F, G, H]],
        theme: [[hki, kl, nt, hongkong]]
      },
      type: 'avatars',
      cellPointed: false
    }
  }

  getDefaultType(){
    switch (this.store.main.defaultImagePicker) {
      case 'school':
        return 'schools';
      case 'course':
        return 'alphabet';
      case 'project':
        return 'theme';
      case 'subject':
        return 'theme';
      case 'card':
        return 'theme';
      default:
        return this.state.type;
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const type = this.getDefaultType();
    this.setState({ type: type });
  }

  render() {
    this.init(this.props);
    const status = this.store.main.defaultImagePicker;
    //console.log(this.buttons.bs)
    const isOpen = status !== 'off';

    const pickerStyle = {...this.bs, ...this.ui.styles.container, ...{
      position: 'absolute',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.95)',
      pointerEvents: isOpen? 'auto': 'none'
    }}

    return(
      <Motion defaultStyle={{opacity: 0}}
      style={{opacity: this.atHome? 0: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...pickerStyle, ...{opacity: style.opacity}}}>
            {this.buttons.absoluteClose(()=>{this.actions.main.setDefaultImagePicker('off')})}
            {this.defaultImages()}
          </div>
        )}
      </Motion>
    )
  }

  defaultImages(){
    const containerStyle = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      flexFlow: 'row nowrap'
    }}
    const width = this.bs.width;
    const minWidth = width * 0.75;
    const pointed = this.state.cellPointed;
    const imageSet = this.state.defaultImages[this.state.type];
    if(!imageSet){ return null; }
    return imageSet.map((images, i)=>{
      return(
        <Motion key={i} defaultStyle={{width: pointed? minWidth: width}}
        style={{width: pointed?spring(width): spring(minWidth)}}>
          {style=>(
            <div style={{...containerStyle, ...{width: style.width}}}>
              {images.map((img, i)=>{
                return <PickerOption key={i} url={img} index={i} app={this.app} onPointed={()=>{this.setState({cellPointed: true})}} onUnPointed={()=>{this.setState({cellPointed: false})}}/>
              })}
            </div>
          )}
        </Motion>
      )
    });
  }
}

export default DefaultImagePicker;
