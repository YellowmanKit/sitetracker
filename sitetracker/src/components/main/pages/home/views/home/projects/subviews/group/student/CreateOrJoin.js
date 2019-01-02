import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

class CreateOrJoin extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    this.state = { type: 'join' }
  }

  typeOptions(){
    const optionsStyle = {...this.bs, ...{
      width: '',
      height: '',
      justifyContent: 'center'
    }}
    return(
      <div style={optionsStyle}>
        {this.checkBox(this.func.multiLang('Join other group','加入其他小組','加入其他小组'), this.state.type === 'join', (e)=>{this.setState({ type: 'join' })}, 'black')}
        {this.gap(this.bs.height * 0.015)}
        {this.checkBox(this.func.multiLang('Create your own group','創建你的小組','创建你的小组'), this.state.type === 'create', (e)=>{this.setState({ type: 'create' })}, 'black')}
        {this.gap(this.bs.height * 0.015)}
      </div>
    )
  }

  render(){
    this.init(this.props);
    const join = this.state.type === 'join';

    if(this.func.outDated(this.store.projects.viewingProject.endDate)){
      return(
        <div style={this.subViewStyle()}>
          {this.gap('5%')}
          {this.subTitle(['This project is expired','此專題研習已過期','此专题研习已过期'])}
        </div>
      )
    }

    return(
      <div style={this.subViewStyle()}>
        {this.gap('5%')}
        {this.subTitle(['You are not belong to any group in this project','你在此專題研習中不屬於任何小組','你在此专题研习中不属于任何小组'])}
        {this.sep()}
        {this.gap('2%')}
        {this.typeOptions()}
        {this.gap('2%')}

        {join && this.subTitle(['Join group','加入小組','加入小组'])}
        {join && this.sep()}
        {join && this.inputs.inputField('groupCode','text', ['Enter group code','輸入小組代碼','输入小组代码'], '')}
        {join && this.buttons.rectGreen(['Join group','加入小組','加入小组'], ()=>{ this.joinGroup(); } )}

        {!join && this.subTitle(['Create group','創建小組','创建小组'])}
        {!join && this.sep()}
        {!join && this.inputs.inputField('groupName','text', ['Enter group name','輸入小組名稱','输入小组名称'], '')}
        {!join && this.buttons.rectGreen(['Create group','創建小組','创建小组'], ()=>{ this.createGroup(); } )}
      </div>
    )
  }

  joinGroup(){
    const groupCode = document.getElementById('groupCode').value;
    if(groupCode.length < 5){
      return this.failedMessage(['Invalid group code!', '小組代碼不正確!', '小组代码不正确!'])
    }
    this.actions.groups.joinGroup(this.store.user._id, groupCode);
  }

  createGroup(){
    const groupName = document.getElementById('groupName').value;
    if(groupName.length < 2){
      return this.failedMessage(['Group name must be at lease 2 characters long!', '小組名稱須至少由兩個字元組成!', '小组名称须至少由两个字元组成!'])
    }
    this.actions.groups.createGroup(this.store.user._id, this.store.projects.viewingProject._id, groupName);
  }

}

export default CreateOrJoin;
