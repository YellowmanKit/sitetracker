import React from 'react';
import UI from 'components/UI';
import {Motion, spring, presets}  from 'react-motion';
import Sound from 'react-sound';

import Image from 'components/main/items/ui/Image';
//import Badge from 'components/main/items/Badge';
import Langs from './langs/Langs';

class Card extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      checkingRead: '',
      filename: props.card.audioComment,
      type: 'audioComment',
      playAudioComment: false
    }
    this.checkUrl();
  }

  isReading(state){
    return state.includes('in') || state.includes('far') || state === '';
  }

  componentWillReceiveProps(newProps){
    if(this.isReading(newProps.state) && this.state.checkingRead !== newProps.card._id){
      this.checkStudentRead(newProps.state, newProps.card);
    }
    if(newProps.card.audioComment !== this.state.filename){
      this.setState({ filename: newProps.card.audioComment}, ()=>{ this.checkUrl(); })
    }
  }

  checkStudentRead(state, card){
    if(card.author === this.store.user._id &&
      card.grade !== 'notGraded' &&
      !card.studentRead){
      this.actions.cards.studentReadCard(card._id);
      this.setState({ checkingRead: card._id })
    }
  }

  cardUpper(card){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: '47%'
    }}
    return(
      <div style={style}>
        <Image app={this.app} filename={card.icon} type={'cardIcon'} size={this.bs.height * 0.35}/>
      </div>
    )
  }

  cardLower(card){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: '47%'
    }}
    return(
      <div style={style}>
        <Langs app={this.app} card={card} />
      </div>
    )
  }

  footer(card){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: '6%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      textAlign: 'left'
    }}
    const profile = this.func.getById.profileByUser(card.author, this.store);
    return(
      <div style={style}>
        {this.verGap('2%')}
        {profile && this.textDisplay(profile.name, ['','40%'], '75%', this.ui.colors.deepDarkGrey)}
      </div>
    )
  }

  audioPlayer(){
    if(!this.state.playAudioComment){ return null; }
    const url = this.store.content.cachedUrl[this.state.filename];
    return (
      <Sound
      url={url? url:''}
      playStatus={Sound.status.PLAYING}
      onFinishedPlaying={this.toggleAuidioComment.bind(this)}/>
    )
  }

  checkGeoLocated(card){
    return this.buttons.checkGeoLocated(card.geoLocated);
  }

  render(){
    this.init(this.props);
    const card = this.props.card;

    const containerStyle = {...this.ui.styles.container, ...{
      width: '100%',
      height: '100%',
      flexShrink: 0,
      position: 'absolute'
    }}
    const cardStyle = {...this.ui.styles.border, ...this.bs, ...{
      width: this.bs.height * 0.55,
      height: this.bs.height * 0.85,
      backgroundColor: 'white',
      position: 'relative',
      flexShrink: 0,
      boxShadow: '2px 4px 24px -3px #888888'
    }}
    //const badgeScale = [this.bs.width * 0.25, this.bs.width * 0.25];

    const state = this.props.state;
    const startLeft =
    state === 'inLeft'? -this.bs.width:
    state === 'inRight'? this.bs.width:
    state === 'farToLeft'? this.bs.width:
    state === 'farToRight'? -this.bs.width:
    0;
    const endLeft =
    state === 'outLeft'? -this.bs.width:
    state === 'outRight'? this.bs.width:
    state === 'farToLeft'? -this.bs.width:
    state === 'farToRight'? this.bs.width:
    0;

    const incoming = state.includes('in') || state === '';
    const far = state.includes('far');

    return(
      <Motion key={this.props.card._id + state} defaultStyle={{left: startLeft, opacity: far? 1: incoming? 0:1.1}}
      style={{left: spring(endLeft, {...presets.noWobby, ...{stiffness: far? 50:170}}), opacity: far? 1: incoming? spring(1.1):spring(0)}}>
        {style=>(
          <div style={{...containerStyle, ...{left: style.left, opacity: style.opacity}}}>
            <div style={cardStyle}>
              {this.checkGeoLocated(card)}
              {this.cardUpper(card)}
              {this.cardLower(card)}
              {this.footer(card)}
              {this.cardTags(
                (card.comment && card.comment.length > 0)? ()=>{this.actions.main.enlargeText(card.comment)}: null,
                card.audioComment? ()=>{ this.toggleAuidioComment(); }: null)}
            </div>
            {this.audioPlayer()}
          </div>
        )}
      </Motion>
    )
  }

  toggleAuidioComment(){
    this.setState({ playAudioComment: !this.state.playAudioComment })
  }
}

export default Card;
