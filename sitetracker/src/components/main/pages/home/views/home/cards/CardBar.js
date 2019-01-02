import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';
import Sound from 'react-sound';

class CardBar extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      modified: false,
      filename: this.store.cards.viewingCard.audioComment,
      type: 'audioComment'
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.checkAudioComment(newProps);
  }

  checkAudioComment(props){
    this.init(props);
    const newFilename = this.store.cards.viewingCard.audioComment;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename }, ()=>{ this.checkUrl(); });
    }
  }

  render(){
    this.init(this.props);
    const card = this.store.cards.viewingCard;
    const isOpen = !this.store.switches.hide.cardBar;

    const barStyle = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      position: 'absolute',
      justifyContent: 'flex-start',
      bottom: this.bs.width * 0.04,
      height: this.bs.width * 0.125,
      width: this.bs.width * 0.95,
      borderRadius: '35px',
      backgroundColor: 'rgba(0,0,0,1)'
    }}

    const canSwap = (card.author === this.store.user._id) && (card.grade === 'notGraded' || card.grade === 'failed');
    const ani = this.store.switches.animation.content;
    const expendedRight = -this.bs.width * 0.075;
    const collapsedRight = -this.bs.width * 0.85;

    return(
      <Motion defaultStyle={{right: !ani? (isOpen? expendedRight: collapsedRight): isOpen? collapsedRight: expendedRight, opacity: !ani? (isOpen? 1: 0.25): isOpen? 0.25: 1}}
      style={{right: isOpen? spring(expendedRight): spring(collapsedRight), opacity: isOpen? spring(1): spring(0.25)}}
      onRest={()=>{this.actions.switches.setAnimation('cardBar',false)}}>
        {style=>(
          <div style={{...barStyle, ...{
            right: style.right,
            opacity: style.opacity
          }}}>
            {this.verGap('1%')}
            {isOpen && this.buttons.barCollapse(()=>{this.toggleExpend()})}
            {!isOpen && this.buttons.barExpend(()=>{this.toggleExpend()})}
            {this.verGap('6%')}
            {this.buttons.barSlideShow(()=>{ this.actions.content.pushView('slideShow') }, true)}
            {this.verGap('6%')}
            {this.buttons.barComment(()=>{this.actions.main.enlargeText(card.comment)}, card.comment !== '')}
            {this.verGap('6%')}
            {this.buttons.barAudioComment(()=>{this.toggleAuidioComment()}, card.audioComment)}
            {this.verGap('6%')}
            {this.buttons.barSwipeLeft(()=>{ this.swapCards(true); }, canSwap)}
            {this.verGap('6%')}
            {this.buttons.barSwipeRight(()=>{ this.swapCards(false); }, canSwap)}

            {this.state.playAudioComment &&
              <Sound
              url={this.store.content.cachedUrl[this.state.filename]}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={this.toggleAuidioComment.bind(this)}/>}
          </div>
        )}
      </Motion>
    )
  }

  swapCards(left){
    const studentProject = this.store.studentProjects.viewingStudentProject;
    var cards = studentProject.cards;
    const viewingCard = this.store.cards.viewingCard;
    var index = -1;
    cards.map((cardId, i)=>{
      index = cardId === viewingCard._id? i: index;
      return null;
    });
    if(index === -1){ return; }
    if(left && index === 0){ return; }
    if(!left && index === cards.length - 1){ return; }

    const delta = left? -1:1;
    var cardToSwap = cards[index + delta];
    cards[index + delta] = cards[index];
    cards[index] = cardToSwap;
    studentProject.cards = cards;

    this.actions.studentProjects.update(studentProject);
    this.actions.cards.setAction(left?'swapLeft':'swapRight');
  }

  toggleAuidioComment(){
    this.checkAudioComment(this.props);
    this.setState({ playAudioComment: !this.state.playAudioComment })
  }

  toggleExpend(){ this.actions.switches.toggleHide('cardBar'); }

  ani(){ return this.store.switches.animation.cardBar}
}

export default CardBar;
