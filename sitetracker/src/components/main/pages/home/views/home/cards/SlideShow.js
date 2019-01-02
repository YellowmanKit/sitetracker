import React from 'react';
import View from 'components/main/pages/home/views/View';
import Image from 'components/main/items/ui/Image';
import Sound from 'react-sound';

class SlideShow extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.cards = this.store.cards.viewingCards;
    const cardIndex = this.getCardIndex();
    this.setCard(cardIndex);
    this.setLang(0);

    this.state = {
      cardIndex: cardIndex,
      langIndex: -1,
      audioPlaying: false,
      filename: this.lang.audio,
      type: 'langAudio'
    }
    this.checkUrl();
    this.preloadLangsAudio(this.store.cards.viewingCards);
    //this.onNextClick();
  }

  preloadLangsAudio(cardsId){
    for(var i=0;i<cardsId.length;i++){
      const card = this.func.getById.card(cardsId[i], this.store);
      const langsId = card.langs;
      for(var j=0;j<langsId.length;j++){
        const lang = this.func.getById.lang(langsId[j], this.store);
        this.func.url(lang.audio, 'langAudio');
      }
    }
  }

  getCardIndex(){
    var cardIndex = 0;
    this.cards.map((cardId, i)=>{
      if(cardId === this.store.cards.viewingCard._id){
        cardIndex = i;
      }
      return null;
    })
    return cardIndex;
  }

  setCard(cardIndex){
    if(cardIndex > this.cards.length - 1){ this.actions.content.pullView(); return; }
    this.card = this.func.getById.card(this.cards[cardIndex], this.store);
    this.actions.cards.viewCard(this.card);
  }

  setLang(langIndex){
    var cardIndex = this.state? this.state.cardIndex: this.getCardIndex();
    var index = langIndex;
    if(index > this.card.langs.length - 1){
      index = 0;
      cardIndex += 1;
      this.setCard(cardIndex);
    }
    this.setState({ cardIndex: cardIndex, langIndex: index });
    this.lang = this.func.getById.lang(this.card.langs[index], this.store);
  }

  slideImage(){
    return(
      <div style={{...this.ui.styles.container, ...{width: this.bs.width, height: this.bs.height * 0.5}}}>
        <Image
        app={this.app}
        filename={this.card.icon}
        type={'cardIcon'}
        backgroundColor={'black'}
        scale={[this.bs.width, this.bs.height * 0.5]}
        noBorder={true}/>
      </div>
    )
  }

  slideLangText(){
    const textStyle = {
      color: 'white',
      fontWeight: 'bold',
      width: '100%',
      height: '',
      fontSize: '300%',
      textAlign: 'center',
      cursor: 'pointer'
    }
    return(
      <div onClick={()=>{ this.setState({ audioPlaying: true })}} style={{width: this.bs.width, height: this.bs.height * 0.5, overflow: 'auto'}}>
        <div style={textStyle}>{this.lang.text}</div>
      </div>
    )
  }

  render(){
    this.init(this.props);

    return (
      <div style={{...this.viewStyle(), ...{ backgroundColor: 'black' }}}>
        {this.slideImage()}
        {this.slideLangText()}
        {this.state.audioPlaying &&
        <Sound
        url={this.url.url}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={this.onPlaybackEnd.bind(this)}/>}
        {this.buttons.slideNext(()=>{this.onNextClick()})}
        {this.buttons.slideBack(()=>{this.onBackClick()})}
      </div>
    )
  }

  onPlaybackEnd(){
    this.setState({
      audioPlaying: false
    })
  }

  onNextClick(){
    var nextLangIndex = this.state.langIndex + 1;
    this.setLang(nextLangIndex);

    this.setState({
      filename: this.lang.audio,
      audioPlaying: true
    }, ()=>{ this.checkUrl(); });
  }

  onBackClick(){
    var cardIndex = this.state.cardIndex;
    var langIndex = this.state.langIndex - 1;
    if(langIndex < 0){
      cardIndex = this.state.cardIndex - 1;
      if(cardIndex < 0){ return; }
      this.setCard(cardIndex);
      langIndex = this.card.langs.length - 1;
    }
    this.setLang(langIndex);

    this.setState({
      cardIndex: cardIndex,
      langIndex: langIndex,
      filename: this.lang.audio,
      audioPlaying: true
    }, ()=>{ this.checkUrl(); });
  }

}

export default SlideShow;
