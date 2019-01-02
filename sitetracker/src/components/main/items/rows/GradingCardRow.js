import React from 'react';
import Row from './Row';
import LangRow from 'components/main/pages/home/views/home/cards/langs/LangRow';
import Image from 'components/main/items/ui/Image';
import Badge from 'components/main/items/Badge';

class GradingCardRow extends Row {

  constructor(props){
    super(props);
    this.state = { autoPlayLang: -1 };
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(this.props.selected !== this.props.index &&
      newProps.selected === newProps.index){
      this.setState({ autoPlayLang: 0 })
    }
    if(newProps.index === 0 &&
      this.state.autoPlayLang === -1 &&
      newProps.selected === newProps.index){
      this.setState({ autoPlayLang: 0 })
    }
  }

  langRows(){
    const style = {...this.bs, ...{
      height: '',
      width: '65%'
    }}
    const langsId = this.props.card.langs;
    //console.log(langsId)
    const langs = [];
    langsId.map(id=>{
      return langs.splice(0,0,this.func.getById.lang(id, this.store));
    })
    //console.log(langs)
    return(
      <div style={style}>
        {langs.slice(0).reverse().map((lang,i)=>{
          return this.langRow(lang, i)
        })}
      </div>
    )
  }

  langRow(lang, i){
    const rowStyle = {...this.ui.styles.area, ...{
      flexShrink: 0,
      width: '95%',
      alignItems: 'center'
    }}
    return(
      <div key={i} style={rowStyle}>
        <LangRow app={this.app} lang={lang}
        autoPlay={(this.selected && this.state.autoPlayLang === i)? true: false}
        onAutoPlayEnd={()=>{ this.setState({ autoPlayLang: this.state.autoPlayLang + 1 }) }}/>
      </div>
    )
  }

  selecter(){
    const style = {...this.ui.styles.button, ...{
      position: 'absolute',
      width: '100%',
      height: '100%'
    }}
    return(
      <button style={style} onClick={this.props.onClick}/>
    )
  }

  content(animatedStyle){
    this.init(this.props);
    if(this.props.project === null){
      return null;
    }

    const rowStyle = {...this.ui.styles.border, ...this.ui.styles.area, ...{
      flexShrink: 0,
      width: '95%',
      backgroundColor: 'white',
      alignItems: 'flex-start',
      position: 'relative',
      margin: '5px',
      opacity: animatedStyle.opacity,
      boxShadow: '2px 4px 24px -3px #888888'
    }}
    const iconContainerStyle = {...this.ui.styles.container, ...{
      width: this.bs.width * 0.28,
      height: this.bs.width * 0.28
    }}

    const card = this.props.card;
    const badgeScale = [this.bs.width * 0.15, this.bs.width * 0.15]

    return(
      <div id={'row' + this.props.index} style={rowStyle}>
        <Badge app={this.app} grade={card.grade} scale={badgeScale} />
        <div style={iconContainerStyle}>
          <Image app={this.app} filename={card.icon} type={'cardIcon'} size={this.bs.width * 0.24}/>
        </div>
        {this.langRows()}
        {this.cardTags(
          this.props.card.comment? this.props.toggleCommentPanel: null,
          this.props.card.audioComment?  this.props.toggleAudioCommentPanel: null )}
        {!this.selected && this.selecter()}
      </div>
    )
  }

  render(){
    this.selected = this.props.selected === this.props.index;
    return this.animatedFadingRow(this.content.bind(this), this.selected);
  }
}

export default GradingCardRow;
