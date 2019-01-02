import React from 'react';
import UI from 'components/UI';

import LangEditRow from 'components/main/items/rows/LangEditRow';

class LangEditor extends UI {

  componentDidMount(){
    this.init(this.props);
    this.editLangs = this.store.langs.editLangs;
    if(this.editLangs.length === 0){
      this.initRow();
    }
  }

  initRow(){
    const defaultLangs = this.props.defaultLangs;
    if(defaultLangs){
      defaultLangs.map(langId=>{
        const lang = this.func.getById.lang(langId, this.store);
        var newLangRow = {
          _id: lang._id,
          key: lang.key,
          text: lang.text,
          defaultAudio: lang.audio,
          audioBlob: null
        }
        this.actions.langs.pushEditLangs(newLangRow);
        return null;
      })
    }else{
      this.pushNewRow();
    }
  }

  pushNewRow(){
    const langKeys = this.store.langs.langKeys;
    const length = this.editLangs.length;
    var newLangRow = {
      key: langKeys[length].key,
      text: '',
      audioBlob: null
    }
    this.actions.langs.pushEditLangs(newLangRow);
    this.actions.switches.setAnimation('row', true);
  }

  langEditRows(){
    return this.editLangs.map((editLang,i)=>{
      return(
        <LangEditRow key={editLang.key + i} app={this.app} editLang={editLang} index={i}/>
      )
    })
  }

  render() {
    this.init(this.props);
    this.editLangs = this.store.langs.editLangs;
    const editorStyle = {...this.bs, ...this.ui.styles.list, ...{
      width: this.bs.width * 1,
      height: this.bs.height * 0.45,
      backgroundColor: this.ui.colors.ultraLightGrey
    }}
    return(
      <div style={editorStyle}>
        {this.langEditRows()}
        {this.editLangs.length < this.store.langs.langKeys.length && this.buttons.listAdd([this.bs.width * 0.9, this.bs.height * 0.075], ['ADD NOTE','增加註欄','增加注栏'], '200%', ()=>{this.pushNewRow()})}
      </div>
    )
  }

}

export default LangEditor;
