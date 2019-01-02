import React from 'react';
import UI from 'components/UI';
import Sound from 'react-sound';

import icon_play from 'resources/images/buttons/buttonIcons/play_grey.png';
import icon_stop from 'resources/images/buttons/buttonIcons/stop_grey.png';

class LangRow extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: props.lang.audio,
      type: 'langAudio',
      isPlaying: false
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const newFilename = newProps.lang.audio;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename, type: 'langAudio' })
      this.checkUrl();
    }
    if(!this.props.autoPlay && newProps.autoPlay && !this.state.isPlaying){
      this.setState({ isPlaying: true })
    }
  }

  playback(){
    if(this.state.isPlaying){ return; }
    this.setState({
      isPlaying: true
    })
  }

  onPlaybackEnd(){
    this.setState({
      isPlaying: false
    })
    if(this.props.autoPlay && this.props.onAutoPlayEnd){
      this.props.onAutoPlayEnd();
    }
  }

  stopPlayback(){
    if(!this.state.isPlaying){ return; }
    this.onPlaybackEnd();
  }

  langRow(){
    const lang = this.props.lang;

    const rowStyle = {...this.bs, ...{
      width: '100%',
      height: this.props.single? this.bs.height * 0.37: this.bs.height * 0.185,
      backgroundColor: 'white',
      borderBottom: '4px solid ' + this.ui.colors.ultraLightGrey,
      flexShrink: 0
    }}

    return(
      <div style={rowStyle}>
        {this.audio(lang)}
        {this.langBar(lang)}
        {this.langText(lang.text)}
        {this.gap('1%')}
      </div>
    )

  }

  audio(lang){
    if(this.state.isPlaying){
      return(
        <Sound
        url={this.url.url}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={this.onPlaybackEnd.bind(this)}/>
      )
    }
    return null;
  }

  langBar(lang){
    const barStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.065,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexShrink: 0
    }}

    const sizeSmall = [this.bs.width * 0.04,this.bs.width * 0.04];

    return(
      <div style={barStyle}>
        {this.verGap('1%')}
        {this.textDisplay(this.func.multiLang('note','註','注') + ' ' +  (this.props.index + 1), ['70%',''], '75%', 'left', this.ui.colors.deepDarkGrey)}
        {this.verGap('12%')}
        {!this.state.isPlaying && this.buttons.langBar(icon_play , 0.25, sizeSmall,()=>{this.playback()})}
        {this.state.isPlaying && this.buttons.langBar(icon_stop, 0.25, sizeSmall,()=>{this.stopPlayback()})}
      </div>
    )
  }

  langText(text){
    const style = {...this.ui.styles.button, ...{
      width: '95%',
      height: '',
      fontSize: '200%',
      overflow: 'auto',
      overflowWrap: 'break-word',
      textAlign: 'left'
    }}
    return(
      <button style={style} onClick={()=>{this.actions.main.enlargeText(text)}}>
        {text}
      </button>
    )
  }

  render() {
    this.init(this.props);
    return this.langRow();
  }

}

export default LangRow;
