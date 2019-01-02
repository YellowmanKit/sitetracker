import React from 'react';
import UI from 'components/UI';

import LangRow from './LangRow';

class Langs extends UI {

  constructor(props){
    super(props);
    this.state={
      langs:[]
    }
  }

  componentDidMount(){
    this.init(this.props);
    this.getLangs(this.props);
  }

  componentWillReceiveProps (newProp){
    this.init(this.props);
    this.getLangs(newProp);
  }

  getLangs(props){
    const langsId = props.card.langs;
    var _langs = [];
    for(var i=0;i<langsId.length;i++){
      _langs.splice(0,0, this.func.getById.lang(langsId[i], this.store))
    }
    this.setState({
      langs: _langs
    })
  }

  langRows(){
    const single = this.state.langs.length === 1? true:false;
    return(
      this.state.langs.slice(0).reverse().map((lang, i)=>{
        return <LangRow key={i} index={i} app={this.props.app} lang={lang} single={single}/>
      })
    )
  }

  render() {
    this.init(this.props);
    const langsStyle = {...this.bs, ...this.ui.styles.list, ...{
      width: '85%',
      height: '100%',
      backgroundColor: 'white'
    }}
    return(
      <div style={langsStyle}>
        {this.langRows()}
      </div>
    )
  }

}

export default Langs;
