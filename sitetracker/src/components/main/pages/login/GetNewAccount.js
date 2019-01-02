import React from 'react';
import UI from 'components/UI';

class GetNewAccount extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      codeType: 'course'
    }
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.props.animatedStyle}>
        {this.codeOptions()}
        {this.inputs.inputField('code','text',
        this.state.codeType === 'course'?
        ['Enter team code','輸入小隊代碼','输入小队代码']:
        ['Enter organization code','輸入組織代碼','输入组织代码'], '')}
        {this.buttons.rectGreen(['Acquire new account','獲得新帳號','获得新帐号'], ()=>this.actions.user.getNewAccountByCode(document.getElementById('code').value, this.state.codeType))}
        {this.buttons.rectRed(['Cancel','取消','取消'], ()=>this.actions.main.setStatus('waitForLogin'))}
      </div>
    )
  }

  codeOptions(){
    const optionsStyle = {...this.bs, ...{
      width: '',
      height: '',
      justifyContent: 'center'
    }}
    return(
      <div style={optionsStyle}>
        {this.checkBox(this.func.multiLang('Get member account by team code','憑小隊代碼申請隊員帳號','凭小队代码申请队员帐号'), this.state.codeType === 'course', (e)=>{this.setState({ codeType: 'course' })})}
        {this.gap(this.bs.height * 0.015)}
        {this.checkBox(this.func.multiLang('Get leader account by organization code','憑組織代碼申請組長帳號','凭组织代码申请队长帐号'), this.state.codeType === 'school', (e)=>{this.setState({ codeType: 'school' })})}
        {this.gap(this.bs.height * 0.015)}
      </div>
    )
  }

}

export default GetNewAccount;
