import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import menu_bg from 'resources/images/slideMenu/menu_bg.png';
import power from 'resources/images/buttons/buttonIcons/power.png';

class Menu extends UI {

  switchView(view){
    this.actions.content.pushView(view);
    this.actions.content.toggleMenu();
  }

  info(){
    const areaStyle = {...styles.areaBase, ...{
      backgroundColor: 'transparent',
      marginTop: '3%',
      flexGrow: 6
    }}
    const type =
    this.store.user.type === 'student'? this.func.multiLang('Student','學生','学生'):
    this.store.user.type === 'teacher'? this.func.multiLang('Teacher','老師','老师'):
    this.store.user.type === 'admin'? this.func.multiLang('Admin','管理員','管理员'):
    this.store.user.type === 'developer'? this.func.multiLang('Developer','開發者','开发者'):
    '';

    return(
      <div style={areaStyle}>
        <div style={{flexGrow: 1,fontSize: '125%', color: 'white'}}>{this.store.profile.name}</div>
        <div style={{flexGrow: 1,fontSize: '100%', color: 'grey'}}>{this.store.user.id + ' (' + type + ')'}</div>
      </div>
    )
  }

  optionsList(){
    const areaStyle = {...styles.areaBase, ...{
      backgroundColor: 'transparent',
      flexGrow: 95
    }}
    const buttonStyle = {...this.ui.styles.button, ...{
      fontWeight: 'bold',
      fontSize: this.bs.width * 0.04,
      textAlign: 'left',
      margin: '3%',
      color: 'white',
      height: this.bs.width * 0.075
    }}
    const buttons =
    [
      ['account','Account','帳號資訊','帐号资讯'],
      ['profile','Profile','個人檔案','个人档案'],
      //['setting','Setting','設定'],
      ['credit','Credit','鳴謝','鸣谢']
    ]
    return(
      <div style={areaStyle}>
        {this.gap(this.bs.width * 0.05)}
          {buttons.map((item,i)=>{
            return <button key={i} onClick={()=>{this.actions.main.setPhoto({url: null, blob: null}); this.switchView(item[0]);}} style={buttonStyle}> {this.func.multiLang(item[1],item[2],item[3])} </button>
          })}
      </div>
    )
  }

  logoutButton(){
    const areaStyle = {...styles.areaBase, ...{
      flexFlow: 'row nowrap',
      backgroundColor: 'transparent',
      flexGrow: 5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer'
    }}
    const textStyle = {
      fontWeight: 'bold',
      fontSize: this.bs.height * 0.035,
      textAlign: 'left',
      color: this.ui.colors.mlangGreen
    }
    const iconStyle = {
      width: this.bs.height * 0.035,
      height: this.bs.height * 0.035,
    }
    return(
      <div style={areaStyle} onClick={()=>this.logout()}>
        <img style={iconStyle} src={power} alt=''/>
        {this.verGap('2%')}
        <div style={textStyle}> {this.func.multiLang('Logout','登出','登出')} </div>
      </div>
    )
  }

  backArea(){
    const areaStyle = {...this.ui.styles.button, ...{
      position: 'absolute',
      right: 0,
      width: this.bs.width * 0.2,
      height: this.bs.height
    }}
    return <button style={areaStyle} onClick={this.actions.content.toggleMenu}/>
  }

  render() {
    this.init(this.props);
    const status = this.app.store.content.menu;
    if(status === 'init'){ return null; }

    const isOpen = status !== 'off';
    const menuStyle = {...this.bs, ...{
      position: 'absolute',
      alignItems: 'left',
      justifyContent: 'flex-start',
      backgroundImage: 'url(' + menu_bg + ')',
      backgroundSize: '100% 100%'
    }}

    return(
      <Motion defaultStyle={{left: isOpen?-this.bs.width: 0, opacity: isOpen?0:1.1}}
      style={{left: isOpen? spring(0):spring(-this.bs.width), opacity: isOpen?spring(1.1):spring(0)}}>
        {style=>(
          <div style={{...menuStyle, ...{left: style.left, opacity: style.opacity}}}>
            {this.backArea()}
            {this.info()}
            <div style={{ flexGrow: 12 }}/>
            {this.optionsList()}
            {this.logoutButton()}
          </div>
        )}
      </Motion>
    )
  }

  logout(){
    this.db.set('autoLogin', false);
    this.actions.content.toggleMenu();
    this.actions.user.logout();
  }
}

const styles = {
  areaBase: {
    width: '75%',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'left',
    opacity: 1,
    marginLeft: '2%',
    fontWeight: 'bold'
  }
}



export default Menu;
