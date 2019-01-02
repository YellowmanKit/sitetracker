import React from 'react';
import UI from 'components/UI';
import {Motion, spring} from 'react-motion';
import Nyan from './Nyan';

class Recording extends UI {

  constructor(props){
    super(props);
    this.state = { time: 0 }
  }

  componentWillReceiveProps(newProps){
    if(!this.props.app.store.main.recording && newProps.app.store.main.recording){
      this.onStart();
    }
  }

  onStart(){
    this.counter = setTimeout(()=>{ this.setState({ time: this.state.time + 1 }); this.onStart(); }, 1000);
  }

  onEnd(){
    clearTimeout(this.counter);
    this.setState({ time: 0 });
  }

  render() {
    this.init(this.props);

    const main = this.store.main;
    const isOpen = main.recording;

    const containerStyle = {...this.bs, ...this.ui.styles.container, ...{
      position: 'absolute',
      minHeight: this.bs.minHeight,
      backgroundColor: 'rgba(255,255,255,0.9)',
      justifyContent: 'center',
      pointerEvents: isOpen? '':'none'
    }}
    const cloudStyle = {...this.bs, ...this.ui.styles.button, ...this.ui.styles.container, ...{
      width: this.bs.width * 0.5,
      height: this.bs.height * 0.4,
      backgroundColor: 'transparent',
      justifyContent: 'center'
    }}
    const nyanSize = [this.bs.height * 0.075, this.bs.height * 0.075];
    const time = this.state.time;
    return(
      <Motion defaultStyle={{opacity: 0}}
      style={{opacity: isOpen? spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...containerStyle, ...{ opacity: style.opacity }}}>
            <div style={cloudStyle} onClick={()=>{ this.onEnd(); main.onRecordStop(); }}>
              {this.textDisplay(this.func.multiLang('Recording...', '錄音中...','录音中...'), ['100%',''], this.bs.height * 0.065)}
              {this.gap(this.bs.height * 0.025)}
              {this.textDisplay(time ,['100%',''], this.bs.height * 0.035, 'center', 'red')}
              <Nyan status={'runningLeft'} size={nyanSize} app={this.app}/>
              {this.gap(this.bs.height * 0.025)}
              {this.textDisplay(this.func.multiLang('Tap here to stop','輕觸此處即可停止','轻触此处即可停止'), ['100%',''], this.bs.height * 0.035, 'center', 'grey')}
            </div>
            {this.gap(this.bs.height * 0.025)}
            {this.scrollableText(
              this.store.main.recordingText? this.store.main.recordingText: '',
              [this.bs.width * 0.85, this.bs.height * 0.35], this.bs.width * 0.05)}
          </div>
        )}
      </Motion>
    )
  }

}

export default Recording;
