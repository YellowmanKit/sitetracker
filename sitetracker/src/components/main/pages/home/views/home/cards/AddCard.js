import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';
import LangEditor from './editLangs/LangEditor';

class AddCard extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      url: null
    }
    this.card = this.store.cards.viewingCard;
    this.getIconUrl(props);
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.card = newProps.app.store.cards.viewingCard;
    this.getIconUrl(newProps);
  }

  async getIconUrl(props){
    if(!this.props.editMode || this.state.url){ return; }
    const url = await this.func.url(this.card.icon, 'cardIcon');
    this.setState({
      url: url
    });
  }

  render() {
    this.init(this.props);
    const editMode = this.props.editMode;
    const coords = this.store.main.geoLocated? this.store.main.geoLocated: editMode? this.card.geoLocated: null;
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        <ImagePicker type={'card'} defaultUrl={this.state.url} app={this.app}/>
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Coordinate','座標','座标'])}
        {this.sep()}
        {!coords && this.textDisplay(this.func.multiLang('Take a picture to record your coordinate', '拍照即可記錄座標', '拍照即可记录座标'))}
        {coords && this.textDisplay(this.func.multiLang('Longitude: ', '經度: ', '经度: ') + coords.longitude)}
        {coords && this.textDisplay(this.func.multiLang('Latitude: ', '緯度: ', '纬度: ') + coords.latitude)}
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Note','註','注'])}
        {this.sep()}
        <LangEditor defaultLangs={this.props.editMode? this.card.langs:null} app={this.app}/>
        {this.sep()}

        {this.buttons.rectGreen(['Submit','提交','提交'], ()=>{this.addCard()})}
        {this.gap('8%')}
      </div>
    )
  }

  addCard(){
    const editMode = this.props.editMode;
    const icon = this.store.main.photoBlob;
    const coords = this.store.main.geoLocated? this.store.main.geoLocated: editMode? this.card.geoLocated: null;

    if(!coords){
      return this.failedMessage(['Failed to submit! Coordinate is missing!', '提交失敗! 未有座標!','提交失败! 未有座标!'])
    }
    if(!editMode && icon === null){
      return this.failedMessage(['Failed to submit! Icon is missing!', '提交失敗! 未有照片!','提交失败! 未有照片!'])
    }
    const editLangs = this.store.langs.editLangs;
    var usedKeys = [];
    for(var i=0;i<editLangs.length;i++){
      if(usedKeys.includes(editLangs[i].key)){
        return this.failedMessage([
          'Failed to submit! Lang key duplicated! Please make sure each language appeared once only!',
          '提交失敗! 語言列不能重複! 請確定每種語言只出現一次!',
          '提交失败! 语言列不能重复! 请确定每种语言只出现一次!'])
      }
      if(editLangs[i].text === ''){
        return this.failedMessage(['Failed to submit! Lang text missing!', '提交失敗! 語言列缺少文字!','提交失败! 语言列缺少文字!'])
      }
      if(!editLangs[i].defaultAudio && !editLangs[i].audioBlob){
        return this.failedMessage(['Failed to submit! Lang audio missing!', '提交失敗! 語言列缺少錄音!','提交失败! 语言列缺少录音!'])
      }
      usedKeys.splice(0,0,editLangs[i].key)
    }

    if(!editMode){
      this.actions.cards.addCard({
        icon: icon,
        editLangs: editLangs,
        project: this.store.projects.viewingProject,
        studentProject: this.store.studentProjects.viewingStudentProject,
        author: this.store.user._id,
        isTeacher: this.store.user.type === 'teacher',
        geoLocated: this.store.main.geoLocated
      });
    }else if(!this.props.resubmit){
      this.actions.cards.editCard({
        card: this.card,
        newIcon: icon,
        editLangs: editLangs,
        newGeoLocated: this.store.main.geoLocated? this.store.main.geoLocated: null
      });
    }else{
      this.actions.cards.addCard({
        resubmitCard: this.card._id,
        icon: this.card.icon,
        newIcon: icon,
        editLangs: editLangs,
        project: this.store.projects.viewingProject,
        studentProject: this.store.studentProjects.viewingStudentProject,
        author: this.store.user._id
      });
    }
  }
}

export default AddCard;
