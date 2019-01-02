import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Enlarger extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state={
      fontSizes: [this.bs.height * 0.05, this.bs.height * 0.1, this.bs.height * 0.15, this.bs.height * 0.3],
      sizeIndex: 0
    }
  }

  render() {
    this.init(this.props);
    const main = this.store.main;
    const status = main.enlarger;
    //console.log(this.buttons.bs)
    const isOpen = status !== 'off';

    const enlargerStyle = {...this.bs, ...{
      position: 'absolute',
      minHeight: this.bs.minHeight,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.95)',
      pointerEvents: isOpen? 'auto': 'none'
    }}

    const textStyle = {
      color: 'white',
      fontWeight: 'bold',
      width: '100%',
      height: '',
      fontSize: this.state.fontSizes[this.state.sizeIndex],
      overflow: 'auto',
      overflowWrap: 'break-word',
      textAlign: 'center',
      cursor: 'pointer'
    }

    return(
      <Motion defaultStyle={{opacity: isOpen?0:1.5}}
      style={{opacity: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...enlargerStyle, ...{opacity: style.opacity}}}>
            {this.buttons.absoluteClose(()=>{this.actions.main.closeEnlarger()})}
            {status === 'image' &&
            <img src={main.enlargeImage} style={{maxWidth: this.bs.width}} alt=''/>}
            {status === 'text' &&
            <div style={textStyle} onClick={()=>{ this.setState({ sizeIndex: (this.state.sizeIndex + 1) % this.state.fontSizes.length }); }}>{main.enlargeText}</div>}
          </div>
        )}
      </Motion>
    )
  }

}

export default Enlarger;
