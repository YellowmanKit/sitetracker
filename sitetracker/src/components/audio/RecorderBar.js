import React from 'react';
import UI from 'components/UI';
import Sound from 'react-sound';
import WAVEInterface from 'components/audio/waveInterface';

import icon_recorder from 'resources/images/buttons/buttonIcons/recorder_black.png';
import icon_play from 'resources/images/buttons/buttonIcons/play_black.png';
import icon_stop from 'resources/images/buttons/buttonIcons/stop_black.png';
import icon_cross from 'resources/images/buttons/buttonIcons/cross_black.png';

class RecorderBar extends UI {
  waveInterface = new WAVEInterface(this.props.app);

  componentWillMount() { this.waveInterface.reset(); }
  componentWillUnmount() { this.waveInterface.reset(); }

  constructor(props){
    super(props);
    this.state = {
      filename: props.defaultAudio,
      type: props.type,
      audioPlaying: false,
      defaultAudioPlaying: false
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const newFilename = newProps.defaultAudio;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename }, ()=>{ this.checkUrl(); })
    }
    this.autoPlay(newProps);
  }

  autoPlay(newProps){
    if(!newProps.autoPlay || this.store.main.recording){ return; }
    if((newProps.defaultAudio && !this.state.defaultAudioPlaying && this.url.url) ||
      (newProps.audioBlob && !this.state.audioPlaying)){
      setTimeout(()=>{ if(this.props.autoPlay){ this.playback(); } }, 100);
    }
  }

  record(){
    this.waveInterface.reset();

    this.waveInterface.startRecording()
    .then(() => {
      this.actions.main.setAudioRecorder({recording: true, recordingText: this.props.recordingText, onRecordStop: ()=>{this.stopRecord()}});
    })
    .catch((err) => {
      this.actions.modal.message([err.message, err.message]);
      throw err;
    })
  }

  stopRecord(){
    this.waveInterface.stopRecording()
    this.actions.main.setAudioRecorder({recording: false, onRecordStop: null});

    const blob = this.waveInterface.audioData;
    this.props.onStopRecording(blob);
  }

  playback(){
    if(this.state.audioPlaying || (!this.props.audioBlob && !this.props.defaultAudio)){ return; }
    //console.log(this.props.audioBlob)
    if(this.props.audioBlob){
      this.waveInterface.startPlayback(false, this.props.audioBlob, ()=>{this.onPlaybackEnd()})
      //.then(()=>{
        this.setState({ audioPlaying: true })
      //})
    }else if(this.props.defaultAudio && this.url.url){
      this.setState({ defaultAudioPlaying: true })
    }

  }

  onPlaybackEnd(){
    this.setState({ audioPlaying: false, defaultAudioPlaying: false })
  }

  stopPlayback(){
    if(this.state.audioPlaying){
      this.setState({ audioPlaying: false });
      this.waveInterface.stopPlayback();
    }
    if(this.state.defaultAudioPlaying){
      this.setState({ defaultAudioPlaying: false })
    }
  }

  langBar(i){
    const barStyle = {...this.ui.styles.area, ...{
      width: this.props.scale[0],
      height: this.props.scale[1],
      alignItems: 'center'
    }}

    const sizeSmall = [this.bs.height * 0.04,this.bs.height * 0.04];
    const sizeBig = [this.bs.height * 0.05,this.bs.height * 0.05];

    const audioBlob = this.props.audioBlob;
    const hvAudio = (audioBlob || this.props.defaultAudio);
    const isPlaying = this.state.audioPlaying || this.state.defaultAudioPlaying;

    return(
      <div style={barStyle}>
        {this.verGap('15%')}
        {this.buttons.langBar(icon_recorder, hvAudio? 0.7: 0.15, sizeBig, ()=>{this.record(i)})}
        {this.verGap('15%')}
        {this.buttons.langBar(icon_play , (hvAudio && !isPlaying)? 0.7:0.15, sizeSmall,()=>{this.playback(i)})}
        {this.verGap('15%')}
        {this.buttons.langBar(icon_stop, (hvAudio && isPlaying)? 0.7:0.15, sizeBig,()=>{this.stopPlayback(i)})}
        {this.verGap('15%')}
        {this.props.canRemove && this.buttons.langBar(icon_cross, hvAudio? 0.7:0.15, sizeBig,()=>{this.props.onStopRecording(null)})}
        {this.state.defaultAudioPlaying && this.props.defaultAudio && this.url.url &&
          <Sound
          url={this.url.url}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.onPlaybackEnd.bind(this)}/>}
      </div>
    )
  }

  render() {
    this.init(this.props);
    return this.langBar(this.props.index);
  }

}

export default RecorderBar;
