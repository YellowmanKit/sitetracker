import React, { Component } from 'react';
import URL from './URL';
import Button from 'components/main/items/ui/Button';
import Input from 'components/main/items/ui/Input';
import {Motion, spring}  from 'react-motion';

import tab_bar from 'resources/images/general/tab_bar.png';
import shadow from 'resources/images/general/shadow.png';
import triangle from 'resources/images/general/triangle.png';
import triangle_down from 'resources/images/general/triangle_down.png';
//import icon_comment from 'resources/images/buttons/buttonIcons/comment_black.png';
//import icon_audioComment from 'resources/images/buttons/buttonIcons/audioComment_black.png';
import icon_alert2 from 'resources/images/icons/alert2.png';

class UI extends Component {
  url = new URL(this.props.app);
  buttons = new Button(this.props.app)
  inputs = new Input(this.props.app)

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.checkUrl();
  }

  checkUrl(){
    if(this.state && this.state.filename){
      //console.log('getting url: ' + this.state.filename);
      this.url.getUrl(this.state.filename, this.state.type);
    }else{
      //console.log('no filename in state');
    }
  }

  init(props){
    this.app = props.app;
    this.ui = this.app.store.ui;
    this.bs = this.ui.basicStyle;
    this.store = this.app.store;
    this.func = this.app.functions;
    this.db = this.app.database;
    this.actions = this.app.actions;

    this.buttons.init(props.app);
    this.inputs.init(props.app);

    this.atHome = this.store.content.traces.length === 1;
    this.inSchool = this.store.content.traces[1] === 'school' || this.store.content.traces[2] === 'school';

    this.url.init(props.app);
  }

  async setListScroll(id){
    const scrollValue = await this.db.get(id);
    const list = document.getElementById(id);
    if(scrollValue && list){
      list.scrollTo(0, scrollValue);
    }
  }

  onScroll(id){
    const list = document.getElementById(id);
    this.db.set(id, list.scrollTop);
  }

  checkBox(text, checked, onCheck, color){
    const style = {...this.ui.styles.container,...this.ui.styles.area,...{
      width: '',
      height: this.bs.height * 0.035,
      color: color? color: 'white',
      fontSize: this.bs.height * 0.02
    }}
    const checkBoxStyle = {
      width: this.bs.height * 0.025,
      height: this.bs.height * 0.025
    }
    return(
      <div style={style}>
        {text}
        <input style={checkBoxStyle} type='checkbox' checked={checked} onChange={onCheck}/>
      </div>
    )
  }

  animatedAlert(){
    const alertStyle = {
      width: '100%',
      height: '100%'
    }
    const option = {stiffness: 1000, damping: 5, precision: 0.05}
    return(
      <Motion defaultStyle={{ rotate: -45 }}
      style={{ rotate: spring(0, option) }}>
        {style=> <img style={{...alertStyle, ...{ transform: 'rotate(' + style.rotate + 'deg)'}}} src={icon_alert2} alt=''/> }
      </Motion>
    )
  }

  cardTags(commentOnClick, audioCommentOnClick){
    return null;
    /*const width = this.bs.width * 0.05;
    const style = {...this.bs, ...{
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: width,
      height: width * 2,
      justifyContent: 'flex-end'
    }}
    return(
      <div style={style}>
        {this.icon(icon_comment, [width, width], commentOnClick? 0.85:0.1, commentOnClick)}
        {this.icon(icon_audioComment, [width, width], audioCommentOnClick? 0.85:0.1, audioCommentOnClick)}
      </div>
    )*/
  }

  icon(url, scale, opacity, onClick){
    const iconStyle = {
      width: scale[0],
      height: scale[1],
      opacity: opacity,
      backgroundImage: 'url(' + url + ')',
      backgroundSize: '100% 100%',
      cursor: onClick? 'pointer': ''
    }
    return <div style={iconStyle} onClick={onClick}/>
  }

  tabBar(title, hide, onClick){
    const barStyle = {
      backgroundImage: 'url(' + tab_bar + ')',
      backgroundSize: '100% 100%',
      width: '100%',
      height: this.bs.height * 0.05,
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      cursor: onClick? 'pointer':'',
      position: 'relative'
    }
    const textStyle = {
      width: '90%',
      fontSize: this.bs.width * 0.03,
      fontWeight: 'bold',
      textOverflow: 'ellipsis',
      margin: '3%'
    }
    const tagSize = this.bs.height * 0.03;
    return(
      <div style={barStyle} onClick={onClick}>
       <div style={textStyle}>
        {this.func.multiLang(title[0], title[1], title[2])}
       </div>
       {onClick && <img src={hide? triangle:triangle_down} style={{opacity: 0.15, height: tagSize, width: tagSize}} alt=''/>}
       {this.shadow(this.bs.height * 0.05)}
      </div>
    )
  }

  shadow(top){
    const style = {
      width: '100%',
      height: this.bs.height * 0.015,
      position: 'absolute',
      top: top,
      pointerEvents: 'none',
      opacity: 0.5
    }
    return <img src={shadow} style={style} alt=''/>
  }

  detailText(text, id){
    return this.textDisplay(text, ['100%',''], '125%', 'center', 'black', id)
  }

  scrollableText(text, scale, fontSize){
    const style = {
      width: scale? scale[0]: '100%',
      height: scale? scale[1]: '',
      margin: '1%',
      fontSize: fontSize? fontSize: '100%',
      fontWeight: 'bold',
      textAlign: 'center',
      overflow: 'auto',
      overflowWrap: 'break-word',
      flexShrink: 0
    }
    return <div style={style}>{text}</div>
  }

  textDisplay(text, scale, fontSize, textAlign, color, key){
    const style = {
      width: scale? scale[0]: '100%',
      height: scale? scale[1]: '',
      margin: '1%',
      fontSize: fontSize? fontSize: '100%',
      fontWeight: 'bold',
      textAlign: textAlign? textAlign: 'center',
      overflow: 'hidden',
      overflowWrap: 'break-word',
      color: color? color: 'black',
      flexShrink: 0
    }
    return <div key={key} style={style}>{text}</div>
  }

  subTitle(title, fontSize){
    const subTitleStyle = {
      width: '100%',
      color: this.ui.colors.mlangGreen,
      fontSize: fontSize? fontSize:'110%',
      fontWeight: 'bold',
      textAlign: 'center'
    }
    return <div style={subTitleStyle}>{this.func.multiLang(title[0], title[1], title[2])}</div>
  }

  gap(height){
    return <div style={{height: height, width: '100%', flexShrink: 0}} />
  }

  sep(){
    return <div style={{height: '1px', width: '100%', backgroundColor:'black', opacity: 0.15, flexShrink: 0}} />
  }

  verGap(width){
    return <div style={{minWidth: width, height: '100%', flexShrink: 0}}/>
  }

  verSep(color, height){
    return <div style={{backgroundColor: color, width: '1px', height: height, flexShrink: 0}}/>
  }

  failedMessage(message){
    this.actions.modal.message([message[0], message[1], message[2]]);
    this.actions.modal.showModalButton();
  }

}

export default UI;
