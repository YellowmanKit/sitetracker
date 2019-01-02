import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class View extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {}
  }

  componentWillReceiveProps(newProps){
    this.checkViewTransition(newProps);
  }

  checkViewTransition(newProps){
    if(!this.state){ return; }
    this.setState({
      view: newProps.app.store.content.subView,
      deadView: this.state.view !== newProps.app.store.content.subView? this.state.view: this.state.deadView
    });
  }

  animatedView(content, view, isOpen, _option){
    //console.log(view);
    const option = _option? _option: {stiffness: 100, damping: 50, precision: 3}
    return(
      <Motion key={view} defaultStyle={{opacity: isOpen? 0:1}}
      style={{opacity: isOpen?spring(1, option):spring(0, option)}}
      onRest={!isOpen? ()=>{ this.setState({deadView: null}); }: null }>
        {style=>(
          content(view, style)
        )}
      </Motion>
    )
  }

  animatedSubView(content, view, isOpen){
    const option = {stiffness: 1000, damping: 50, precision: 9}
    return this.animatedView(content, view, isOpen, option)
  }

  viewStyle(){
    return {...this.bs, ...{
      height: this.bs.height * 0.92,
      position: 'relative',
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflowY: 'auto',
      backgroundColor: 'white',
      opacity: this.app.animatedStyle.opacity,
      pointerEvents: this.app.animatedStyle.opacity === 1? '':'none'
    }}
  }

  viewContentStyle(){
    return {
      width: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      flexShrink: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflowY: 'auto',
      backgroundColor: 'white'
    }
  }

}

export default View;
