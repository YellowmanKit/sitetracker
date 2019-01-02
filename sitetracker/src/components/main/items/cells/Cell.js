import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

//import Badge from 'components/main/items/Badge';

import passed from 'resources/images/general/expired.png';
import no_image from 'resources/images/general/no_image.png';

class Cell extends UI {

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const newFilename = newProps.data.icon;
    if(!this.url.url || this.state.filename !== newFilename){
      this.setState({ filename: newFilename }, ()=>{ this.checkUrl(); })
    }
  }

  cellImage(scale){
    const imageStyle = {...this.ui.styles.container, ...this.ui.styles.border, ...{
      maxWidth: this.state.size[0] * 0.9 * scale,
      maxHeight: this.state.size[1] * 0.8 * scale,
      marginTop: '4%'
    }};
    const url = this.url.url? this.url.url: no_image;
    return <img key={url} style={imageStyle} src={url} alt=''/>
  }

  cellTitle(scale){
    var text = this.state.title;
    const textScale =['100%','100%'];
    const titleSize = this.state.titleSize? this.state.titleSize: this.bs.height * 0.022;

    return(
      <div style={{flexGrow: 1, overflow: 'hidden'}}>
        {this.textDisplay(text, textScale, titleSize * scale)}
      </div>
    )
  }

  alertTag(){
    const alertSize = this.state.alertSize? this.state.alertSize: this.bs.width * 0.04;
    const alertPosi = this.state.alertPosi? this.state.alertPosi: this.bs.width * -0.02;

    const style = {
      position: 'absolute',
      top: alertPosi,
      right: alertPosi,
      width: alertSize,
      height: alertSize
    }
    return <div style={style}>{this.animatedAlert()}</div>
  }

  passedMark(){
    const style = {
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
    return <img style={style} src={passed} alt=''/>
  }

  render(){
    //this.init(this.props);
    //console.log(data)
    if(!this.props.data){ return null; }
    const outDated = this.state.outDated;
    const size = this.state.size;

    const cellStyle = {...this.state, ...this.ui.styles.button, ...this.ui.styles.border, ...{
      backgroundColor: 'white',
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      position: 'relative',
      boxShadow: '2px 4px 24px -3px #888888'
    }}
    //const badgeScale = [this.bs.width * 0.125, this.bs.width * 0.125];

    const isInit = this.state.status === 'init';
    const isOpen = this.state.status === 'pointed';

    return(
      <Motion defaultStyle={{scale: this.props.wasHide? 0: isInit? 1:isOpen? 1: 1.05, opacity: this.props.wasHide? 0: outDated? (isOpen? 0.25:1) : 1}}
      style={{
        scale: this.props.hide? spring(0): this.props.wasHide? (isOpen? spring(1.05): spring(1)): isInit? 1:isOpen? spring(1.05): spring(1),
        opacity: this.props.hide? spring(0): outDated? (isOpen? spring(1):spring(0.25)) : spring(1)}}>
        {style=>(
          <div style={{...cellStyle,...{opacity: style.opacity, width: size[0] * style.scale, height: size[1] * style.scale}}}
          onClick={()=>{ this.props.onClick(); }}
          onPointerEnter={()=>{ this.setState({status: 'pointed' })}}
          onPointerLeave={()=>{ this.setState({status: 'not-pointed' })}}>
            {this.cellImage(style.scale)}
            {this.cellTitle(style.scale)}
            {this.state.alert && this.alertTag()}
            {outDated && this.passedMark()}
          </div>
        )}
      </Motion>
    )
  }

}

export default Cell;
