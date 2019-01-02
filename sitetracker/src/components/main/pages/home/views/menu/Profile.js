import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

class Profile extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      modified: false,
      filename: this.store.profile.icon,
      type: 'profileIcon'
    }
    this.checkUrl();
  }

  render() {
    this.init(this.props);
    const profile = this.store.profile;
    const forceProfile = this.store.content.view === 'forceProfile';

    return(
      <div style={this.viewStyle()}>
        <div style={this.viewContentStyle()}>
          {this.gap(this.bs.height * 0.04)}

          {forceProfile && this.subTitle(['Please setup your profile!','請設定你的個人檔案!','请设定你的个人档案!'], this.bs.height * 0.03)}
          {forceProfile && this.sep()}
          {forceProfile && this.gap(this.bs.height * 0.04)}

          {this.subTitle(['Your photo','你的照片','你的照片'])}
          {this.sep()}
          <ImagePicker type={'profile'} defaultUrl={this.url.url} app={this.app} />
          {this.sep()}
          {this.gap(this.bs.height * 0.02)}

          {this.subTitle(['Your real name','你的真實姓名','你的真實姓名'])}
          {this.sep()}
          {this.inputs.inputField('name','text','', profile.name, ()=>{ this.setState({modified: true})})}
          {this.gap(this.bs.height * 0.02)}

          {this.subTitle(['Self introduction','自我介紹','自我介绍'])}
          {this.sep()}
          {this.gap(this.bs.height * 0.02)}
          {this.inputs.textArea('desc', '', profile.description, ()=>{ this.setState({modified: true})})}
          {this.gap(this.bs.height * 0.04)}

          {!forceProfile && this.lowerPart()}

          {!forceProfile && this.buttons.rectRed(['Confirm change','確定變更','确定变更'], ()=>{this.changing()})}
          {forceProfile && this.buttons.rectGreen(['Confirm','確定','确定'], ()=>{this.changing()})}

          {this.gap(this.bs.height * 0.08)}
        </div>
      </div>
    )
  }

  lowerPart(){
    const profile = this.store.profile;
    return(
      <div style={{...this.viewStyle(), height: this.bs.height * 0.5, flexShrink: 0}}>
        {this.subTitle(['Total submitted cards','卡片總數','卡片总数'])}
        {this.sep()}
        {this.textDisplay(profile.cardCount, ['50%', this.bs.height * 0.06], '150%', 'center')}
        {this.gap(this.bs.height * 0.02)}

        {this.subTitle(['Total featured cards','精選卡片總數','精选卡片总数'])}
        {this.sep()}
        {this.textDisplay(profile.featuredCount, ['50%',this.bs.height * 0.06], '150%', 'center')}
        {this.gap(this.bs.height * 0.02)}

        {this.subTitle(['Enter current password to change','輸入密碼以變更資訊','输入密码以变更资讯'])}
        {this.sep()}
        {this.inputs.inputField('pw','password','','')}
      </div>
    )
  }

  changing(){
    const profile = this.store.profile;
    const newIconBlob = this.store.main.photoBlob;
    const user = this.store.user;

    const newName = document.getElementById('name').value;
    const newDesc = document.getElementById('desc').value;

    //console.log(newId)
    if(!newIconBlob && !profile.icon){
      return this.failedMessage(['Failed to edit! Icon is missing!', '變更失敗! 未有照片!', '变更失败! 未有照片!'])
    }
    if(newName === ''){
      return this.failedMessage(['Failed to change! Name is missing!', '變更失敗! 請輸入名稱!', '变更失败! 请输入名称!'])
    }
    if(this.store.content.view !== 'forceProfile' && document.getElementById('pw').value !== user.pw){
        return this.failedMessage(['Failed to change! Please enter your password correctly!', '變更失敗! 請輸入正確的密碼!', '变更失败! 请输入正确的密码!'])
    }
    if(!this.state.modified && !newIconBlob){
      return this.failedMessage(['Failed to add! Nothing is modified!', '提交失敗!未作出更改!', '提交失败!未作出更改!'])
    }

    this.actions.profile.changeProfile({
      profile: profile,
      newName: newName,
      newDesc: newDesc,
      newIconBlob: newIconBlob
    });

  }

}

export default Profile;
