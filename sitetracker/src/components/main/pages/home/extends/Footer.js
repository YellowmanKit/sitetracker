import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Footer extends UI {
  render(){
    this.init(this.props);
    const home = document.getElementById('home');
    const view = this.store.content.view;
    if(!view){ return null; }
    if(!home || !this.store.content.view.includes('Home')){ return null; }
    const isOpen = home && home.scrollTop === 0;

    const footerStyle = {...this.ui.styles.container, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      background: this.ui.colors.gradientReverse,
      position: 'absolute',
      bottom: 0
    }}
    const profile = this.store.profile;
    const user = this.store.user;
    const a = user.type === 'admin'? 'an ': 'a ';
    const eng = 'Welcome back ' + profile.name + ', you are now logged in as ' + a + user.type + '.';
    const chi = profile.name + ' 歡迎回來， 你現在登入為 ' + this.func.translateUserType(user.type) + '身份。';
    const sim_chi = profile.name + ' 欢迎回来， 你现在登入为 ' + this.func.translateUserType(user.type) + '身份。';
    const text = this.func.multiLang(eng, chi, sim_chi);

    return(
      <Motion defaultStyle={{opacity: isOpen?0:1.1}}
      style={{opacity: isOpen?spring(1.1):spring(0)}}>
        {style=>(
          <div style={{...footerStyle, ...{opacity: style.opacity}}}>
            {this.textDisplay(text, ['100%',''], '90%')}
          </div>
        )}
      </Motion>
    )
  }
}

export default Footer;
