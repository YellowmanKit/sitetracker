import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import GetNewAccount from './GetNewAccount';
//import icon from 'resources/images/icons/mlang_green.png';

class Login extends UI {

  constructor(props){
    super(props);
    this.init(this.props);
    this.state = {
      loginInfo: null,
      autoLogin: false
    }
    this.getLoginInfo();
  }

  async getLoginInfo(){
    const loginInfo = await this.db.get('loginInfo');
    const language = await this.db.get('language');
    const autoLogin = await this.db.get('autoLogin');
    this.setState({
      loginInfo: loginInfo,
      autoLogin: autoLogin
    });
    this.actions.main.setLanguage(language? language: 'chinese');
    if(autoLogin && loginInfo){
      this.login(loginInfo.id,loginInfo.pw);
    }
  }

  icon(){
    const iconStyle = {
      //width: this.bs.height * 0.4,
      //height: this.bs.height * 0.15,
      fontSize: this.bs.height * 0.1,
      fontAlign: 'center',
      fontWeight: 'bold',
      //backgroundImage: 'url(' + icon + ')',
      //backgroundSize: '100% 100%',
      color: this.ui.colors.mlangGreen,
      flexShrink: 0
    }
    return <div style={iconStyle}>SiteTracker</div>
  }

  onKeepMeLoginChecked(checked){
    this.db.set('autoLogin', checked);
    this.setState({
      autoLogin: checked
    })
  }

  languageBar(){
    const lang = this.store.main.language;

    const barStyle = {
      width: '67%',
      height: '5%',
      marginTop: '5%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center'
    }
    const buttonStyle = {
      flexGrow: 1,
      border: 'none',
      backgroundColor: 'transparent',
      color: 'grey',
      cursor: 'pointer',
      fontWeight: 'normal'
    }

    const simplifiedchineseStyle = {...buttonStyle, ...{color: lang === 'simplified_chinese'? 'white': 'grey'}};
    const chineseStyle = {...buttonStyle, ...{color: lang === 'chinese'? 'white': 'grey'}};
    const englishStyle = {...buttonStyle, ...{color: lang === 'english'? 'white': 'grey'}};

    return(
      <div style={barStyle}>
        {this.buttons.button(simplifiedchineseStyle, ['简体中文','简体中文','简体中文'], '', ()=>this.actions.main.setLanguage('simplified_chinese'))}
        {this.buttons.button(chineseStyle, ['繁體中文','繁體中文','繁體中文'], '', ()=>this.actions.main.setLanguage('chinese'))}
        {this.buttons.button(englishStyle, ['English','English','English'], '', ()=>this.actions.main.setLanguage('english'))}
      </div>
    )
  }

  versionCode(){
    const versionStyle = {
      width: '30%',
      height: '4%',
      marginTop: '5%',
      color: 'grey',
      textAlign: 'center',
      fontWeight: 'bold'
    }
    return <div style={versionStyle}>{this.props.app.store.main.version}</div>
  }

  login(id, pw){
    const _id = id? id:document.getElementById('id').value;
    const _pw = pw? pw:document.getElementById('pw').value;
    //if(_id.length < 5 || _pw.length < 5){ return; }
    this.props.app.actions.user.login(_id, _pw);
  }

  waitForLogin(animatedStyle){
    const loginInfo = this.func.isDev()? this.state.loginInfo: null;
    return(
      <div style={animatedStyle}>
        {this.gap('5%')}
        {this.icon()}
        {this.gap('3%')}
        {this.inputs.inputField('id','text', ['Enter your identity','登入名稱','登入名称'], loginInfo? loginInfo.id:'')}
        {this.inputs.inputField('pw','password', ['Enter your password','密碼','密码'], loginInfo? loginInfo.pw:'')}
        {this.checkBox(this.func.multiLang('Keep me logged in on this device','在此裝置上保持登入','在此装置上保持登入'), this.state.autoLogin, (e)=>{this.onKeepMeLoginChecked(e.target.checked)})}
        {this.buttons.rectGreen(['Login','登入','登入'], ()=>this.login())}
        {this.buttons.rectYellow(['Get new account','申請帳號','申请帐号'], ()=>{ this.onKeepMeLoginChecked(true); this.actions.main.setStatus('getNewAccount'); })}
        {this.buttons.rectRed(['Forget password','忘記密碼','忘记密码'], ()=>this.actions.main.setStatus('forgotPassword'))}
        {this.languageBar()}
        {this.versionCode()}
        {this.gap('5%')}
      </div>
    )
  }

  getNewAccount(animatedStyle){
    return (<GetNewAccount app={this.app} animatedStyle={animatedStyle}/>)
  }

  forgotPassword(animatedStyle){
    return(
      <div style={animatedStyle}>
        {this.inputs.inputField('email','text', ['Enter your email address','輸入你的電郵地址','输入你的电邮地址'], '')}
        {this.buttons.rectGreen(['Reset password','重設密碼','重设密码'], ()=>this.actions.user.resetPassword(document.getElementById('email').value))}
        {this.buttons.rectRed(['Cancel','取消','取消'], ()=>this.actions.main.setStatus('waitForLogin') )}
      </div>
    )
  }

  render() {
    this.init(this.props);
    const status = this.store.main.status;

    return(
      <div style={{...this.bs, ...{ justifyContent: 'center' }}}>
        {this.animatedView(this.waitForLogin.bind(this), status === 'waitForLogin')}
        {this.animatedView(this.getNewAccount.bind(this), status === 'getNewAccount')}
        {this.animatedView(this.forgotPassword.bind(this), status === 'forgotPassword')}
      </div>
    )
  }

  animatedView(view, isOpen){
    //console.log(view);
    const option = {stiffness: 500, damping: 50, precision: 3}
    return(
      <Motion defaultStyle={{opacity: 0}}
      style={{opacity: isOpen?spring(1, option):spring(0, option)}}>
        {style=>(
          view({...this.bs, ...{
            justifyContent: 'center',
            position: 'absolute',
            pointerEvents: isOpen?'':'none',
            opacity: style.opacity }})
        )}
      </Motion>
    )
  }

}

export default Login;
