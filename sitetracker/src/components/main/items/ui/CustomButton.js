import React from 'react';
import UI from 'components/UI';
//import {Motion, spring}  from 'react-motion';

class CustomButton extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      init: true,
      entered: false,
      pressed: false
    }
  }

  onEnter = ()=>{ this.setState({init: false, entered: true}); }
  onLeave = ()=>{ this.setState({init: false, entered: false, pressed: false}); }
  onPress = ()=>{ this.setState({init: false, pressed: true}); }
  onRelease = ()=>{ this.setState({init: false, pressed: false}); this.props.button.onClick();}

  render(){
    this.init(this.props);
    const buttonStyle = {...this.props.button.style, ...{

    }};
    const text = this.props.button.text;

    //const init = this.state.init;
    //const pressed = this.state.pressed;
    //const entered = this.state.entered;

    //const containerStyle = {...this.ui.styles.container, ...buttonStyle, ...{
    //  background: 'transparent'
    //}}

    return <button onClick={this.props.button.onClick} style={buttonStyle}>{this.func.multiLang(text[0], text[1], text[2])}</button>

    /*return(
      <Motion defaultStyle={{scale: init? 1: pressed? 1: 0.98, opacity: init? 1: pressed? 1: 0.75}}
      style={{scale: init? 1: pressed? spring(0.98): spring(1), opacity: init? 1: pressed? spring(0.75): spring(1)}}>
        {style=>(
          <div style={containerStyle}>
            <button
            onPointerEnter={this.onEnter}
            onPointerLeave={this.onLeave}
            onPointerDown={this.onPress}
            onPointerUp={this.onRelease}
            style={{...buttonStyle,...{opacity: style.opacity, width: buttonStyle.width * style.scale, height: buttonStyle.height * style.scale}}}>{this.func.multiLang(text[0], text[1], text[2])}</button>
          </div>
        )}
      </Motion>
    )*/
  }

}

export default CustomButton;
