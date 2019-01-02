import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Content extends UI {

  animatedContent(type, content, isOpen, height){
    const ani = this.store.switches.animation[type];
    return(
      <Motion defaultStyle={{height: !ani? (isOpen? height: 0): isOpen? 0: height, opacity: isOpen?0:1.1}}
      style={{height:isOpen? spring(height): spring(0), opacity: isOpen?spring(1.1):spring(0)}}
      onRest={()=>{this.actions.switches.setAnimation(type,false)}}>
        {style=>content(style)}
      </Motion>
    )
  }

  areaStyle(){
    return({...this.ui.styles.area, ...{
      width: '100%',
      alignItems: 'center',
      overflow: 'auto'
    }})
  }
}

export default Content;
