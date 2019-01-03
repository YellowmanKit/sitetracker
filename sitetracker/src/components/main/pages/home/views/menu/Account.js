import React from 'react';
import View from 'components/main/pages/home/views/View';

class Account extends View {

  render() {
    this.init(this.props);
    const user = this.store.user;
    const student = this.func.multiLang('Member','組員','组员');
    const teacher = this.func.multiLang('Leader','組長','组长');
    const forceAccount = this.store.content.view === 'forceAccount';

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {forceAccount && this.subTitle(['Please setup your account!','請設定你的帳號資訊!','请设定你的帐号资讯!'], this.bs.height * 0.03)}
        {forceAccount && this.sep()}
        {forceAccount && this.gap(this.bs.height * 0.04)}

        {!forceAccount && this.subTitle(['User type','用戶類型','用户类型'])}
        {!forceAccount && this.sep()}
        {!forceAccount && this.gap('2%')}
        {!forceAccount && user.type !== 'admin' && this.inputs.optionBar('type', ['25%', this.bs.height * 0.04], [student, teacher], user.type === 'student'? student: teacher)}
        {!forceAccount && user.type === 'admin' && this.textDisplay(this.func.multiLang('Admin','管理員','管理员'), ['100%',  this.bs.height * 0.03])}
        {!forceAccount && this.gap('2%')}

        {this.subTitle(['Identity','登入名稱','登入名称'])}
        {this.sep()}
        {this.inputs.inputField('id','text','', user.id)}
        {this.gap('2%')}

        {this.subTitle(['Email address','電郵地址','电邮地址'])}
        {this.sep()}
        {this.inputs.inputField('email','text','', user.email)}
        {this.gap('2%')}

        {this.subTitle(['New password','新密碼','新密码'])}
        {this.sep()}
        {this.inputs.inputField('newPw','password', forceAccount?'':['Leave it blank if no change','不更改密碼時請留空','不更改密码时请留空'],'')}
        {this.gap('2%')}

        {this.subTitle(['Confirm new password','確定新密碼','确定新密码'])}
        {this.sep()}
        {this.inputs.inputField('confirmPw','password',forceAccount?'':['Leave it blank if no change','不更改密碼時請留空','不更改密码时请留空'],'')}
        {this.gap('4%')}

        {!forceAccount && this.subTitle(['Enter current password to change','輸入密碼以變更資訊','输入密码以变更资讯'])}
        {!forceAccount && this.sep()}
        {!forceAccount && this.inputs.inputField('pw','password','','')}
        {this.buttons.rectRed(['Confirm change','確定變更','确定变更'], ()=>{this.changing()})}
        {this.gap('8%')}
      </div>
    )
  }

  changing(){
    const user = this.store.user;
    const forceAccount = this.store.content.view === 'forceAccount';

    const selecter =  document.getElementById('type')
    const selected = selecter? selecter.selectedIndex: -1;
    const newType =
    selected === 0? 'student':
    selected === 1? 'teacher':
    null;

    const newId = document.getElementById('id').value;
    const newEmail = document.getElementById('email').value;
    const newPw = document.getElementById('newPw').value;
    const confirmPw = document.getElementById('confirmPw').value;
    const pwField = document.getElementById('pw');
    const pw = pwField? pwField.value: '';

    //console.log(newId)
    if(forceAccount && newId === 'DefaultId'){
      return this.failedMessage(['Failed to change! Please enter your new identity!', '變更失敗! 請輸入新的登入名稱!', '变更失败! 请输入新的登入名称!'])
    }
    if(newId.length < 5){
      return this.failedMessage(['Failed to change! Identity must be at lease 5 characters long!', '變更失敗! 登入名稱須至少由五個字元組成!', '变更失败! 登入名称须至少由五个字元组成!'])
    }
    /*if(!newEmail.includes('@')){
      return this.failedMessage(['Failed to change! Invalid email address!', '變更失敗! 電郵地址不正確!', '变更失败! 电邮地址不正确!'])
    }*/
    if(forceAccount && newPw.length === 0){
      return this.failedMessage(['Failed to change! Please enter your new password!', '變更失敗! 請輸入新的密碼!', '变更失败! 请输入新的密码!'])
    }
    if(newPw.length > 0){
      if(newPw !== confirmPw){
        return this.failedMessage(['Failed to change! Confirm password not equal to new password!', '變更失敗! 確定密碼不相符!', '变更失败! 确定密码不相符!'])
      }
      if(newPw.length < 6){
        return this.failedMessage(['Failed to change! Password must be atlease 6 characters long!', '變更失敗! 密碼至少須由六個字元組成!', '变更失败! 密码至少须由六个字元组成!'])
      }
    }
    if(!forceAccount && pw !== user.pw){
      return this.failedMessage(['Failed to change! Please enter your password correctly!', '變更失敗! 請輸入正確的密碼!', '变更失败! 请输入正确的密码!'])
    }
    if(newType === 'teacher' && (!this.store.profile.joinedSchools || this.store.profile.joinedSchools.length === 0)){
      return this.failedMessage(['Failed to change! You must join a school before switching to teacher!', '變更失敗! 必須先加入學校才能使用老師帳號!', '变更失败! 必须先加入学校才能使用老师帐号!'])
    }

    this.actions.user.changeUserInfo({
      _id: user._id,
      type: newType? newType: user.type,
      id: newId,
      pw: newPw.length >= 6? newPw: user.pw,
      email: newEmail
    });

  }

}

export default Account;
