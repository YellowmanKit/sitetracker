import React from 'react';
import Row from './Row';
import RecorderBar from 'components/audio/RecorderBar';

import icon_cross from 'resources/images/buttons/buttonIcons/cross_grey.png';

class LangEditRow extends Row {

  langRow(){
    const i = this.props.index;

    const rowStyle = {...this.bs, ...{
      width: this.bs.width * 0.9,
      height: this.bs.height * 0.185,
      backgroundColor: 'white',
      borderBottom: '5px solid ' + this.ui.colors.ultraLightGrey,
      flexShrink: 0
    }}

    return(
      <div key={this.props.editLang.key} style={rowStyle}>
        {this.langBar(i, this.props.editLang)}
        {this.inputs.textArea('langText' + i, '', this.props.editLang.text, this.onTextChange.bind(this),  [this.bs.width * 0.87, this.bs.height * 0.1])}
        {this.gap('1%')}
      </div>
    )
  }

  content = (style)=>(
    <div key={this.props.editLang.key} style={{...this.bs, ...{
      width: this.bs.width * 0.9,
      height: style.height,
      opacity: style.opacity,
      backgroundColor: 'white',
      borderBottom: '5px solid ' + this.ui.colors.ultraLightGrey,
      flexShrink: 0
    }}}>
      {this.langBar(this.props.index, this.props.editLang)}
      {this.inputs.textArea('langText' + this.props.index, '', this.props.editLang.text, this.onTextChange.bind(this),  [this.bs.width * 0.87, this.bs.height * 0.1])}
      {this.gap('1%')}
    </div>
  )

  langBar(i, lang){
    const barStyle = {...this.ui.styles.area, ...{
      width: this.bs.width * 0.9,
      height: this.bs.height * 0.065,
      alignItems: 'center'
    }}

    /*const audioBlob =
    this.props.editLang.audioBlob? this.props.editLang.audioBlob:
    this.url.blob;*/
    const audioBlob = this.props.editLang.audioBlob;

    //console.log(audioBlob)
    return(
      <div style={barStyle}>
        {this.verGap('1%')}
        {this.textDisplay(this.func.multiLang('note','註','注') + ' ' +  (i + 1), ['30%',''], '75%', 'left', this.ui.colors.deepDarkGrey)}
        <RecorderBar app={this.app} type={'langAudio'} scale={['65%','100%']}
        defaultAudio={this.props.editLang.defaultAudio} audioBlob={audioBlob}
        onStopRecording={this.onStopRecording.bind(this)} canRemove={false}
        recordingText={this.props.editLang.text}/>
        {i > 0 && this.buttons.langBar(icon_cross, 0.1, [this.bs.width * 0.05,this.bs.width * 0.05],()=>{this.actions.langs.killEditLangsItem(i)})}
        {this.verGap('1%')}
      </div>
    )
  }

  onStopRecording(blob){
    this.actions.langs.setLangAudio({index: this.props.index, blob: blob});
  }

  onOptionChange(event){
    //console.log(event.target.value)
    const langName = event.target.value;
    const _key = this.func.langNameToLangKey(langName);
    this.actions.langs.setEditLang({index: this.props.index, editLang: {...this.props.editLang, key: _key}});
  }

  onTextChange(event){
    const _text = event.target.value;
    this.actions.langs.setEditLang({index: this.props.index, editLang: {...this.props.editLang, text: _text}});
  }

  langKeyOptions(){
    var options = [];
    const langKeys = this.store.langs.langKeys;
    for(var i=langKeys.length - 1;i>=0;i--){
      if(langKeys[i].use){
        options.splice(0,0,this.func.langKeyToLangName(langKeys[i].key));
      }
    }
    return options;
  }

  langKeyDefault(i){
    return this.func.langKeyToLangName(this.store.langs.editLangs[i].key);
  }

  render() {
    this.init(this.props);
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.185, this.props.editLang.killed? ()=>{this.actions.langs.removeEditLangsItem(this.props.index)}: null)
  }

}

export default LangEditRow;
