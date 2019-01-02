import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Hints extends UI {

  render(){
    this.init(this.props);
    const hints = this.store.content.hints;
    const hint = hints.length === 0? null: hints[hints.length - 1];
    const isOpen = hints.length !== 0;

    const hintsStyle = {...this.ui.styles.container, ...{
      backgroundColor: 'rgba(1,1,1,0.5)',
      position: 'absolute',
      width: this.bs.width,
      height: this.bs.height,
      pointerEvents: isOpen? 'auto': 'none'
    }}
    if(this.store.content.view === 'forceProfile' || this.store.content.view === 'forceAccount'){ return null; }
    return(
      <Motion defaultStyle={{opacity: isOpen? 0: 1}}
      style={{opacity: isOpen? spring(1):spring(0)}}>
        {style=>(
          <div key={hints.length} style={{...hintsStyle, ...{opacity: style.opacity}}}>
            {hint && this.hintCloud(hint)}
          </div>
        )}
      </Motion>
    )
  }

  hintCloud(hint){
    const hintStyle = {...this.hintPosi(hint.type),...this.ui.styles.border, ...{
      position: 'absolute',
      background: 'white',
      borderRadius: this.bs.height * 0.01,
      cursor: 'pointer',
      maxWidth: this.bs.width * 0.65
    }}
    const contentStyle = {
      margin: this.bs.height * 0.015,
      fontSize: this.bs.height * 0.025,
      lineHeight: this.bs.height * 0.002,
    }
    const isOpen = !hint.dead;
    this.userType = this.store.user.type;

    return(
      <Motion defaultStyle={{opacity: isOpen? 0: 1}}
      style={{opacity: isOpen? spring(1):spring(0)}}
      onRest={hint.dead?()=>{ this.actions.content.pullHint();}:null}>
        {style=>(
          <div key={hint} style={{...hintStyle,...{opacity: style.opacity}}} onClick={()=>{ this.actions.content.killHint(); }}>
            <div style={contentStyle}>
              {this.hintText(hint.type)}
            </div>
          </div>
        )}
      </Motion>
    )
  }

  hintPosi(type){
    switch (type) {
      case 'schools':
        return { top: this.bs.height * 0.125, left: this.bs.width * 0.0325}
      case 'courses':
        if(this.userType === 'student'){
          return { top: this.bs.height * 0.175, left: this.bs.width * 0.0325}
        }else if(this.userType === 'teacher'){
          return { top: this.bs.height * 0.45, left: this.bs.width * 0.0325}
        }else{
          return { top: 0, left: 0}
        }
      case 'noSubject':
        return { top: this.bs.height * 0.2, left: this.bs.width * 0.0325}
      case 'noProject':
        return { top: this.bs.height * 0.2, left: this.bs.width * 0.0325}
      default:
        return { top: 0, left: 0}
    }
  }

  hintText(type){
    switch (type) {
      case 'schools':
        if(this.userType === 'admin'){
          return this.func.multiLang(
            'You haven\'t created any school yet!\n You can create school by pressing the + button! You shall invite your teachers to join your school by telling them your school code which can be found in the school detail page!',
            '你尚未創建任何學校！你可以用 + 按鈕創建學校，然後把學校代碼告訴你的老師，好讓他們加入！學校代碼可以在詳細資訊頁面找到！',
            '你尚未创建任何学校！你可以用 + 按钮创建学校，然后把学校代码告诉你的老师，好让他们加入！学校代码可以在详细资讯页面找到！'
          )
        }else if(this.userType === 'student' || this.userType === 'teacher'){
          return this.func.multiLang(
            'You haven\'t joined any school yet!\n ',
            '你尚未加入任何學校！如果你是老師，你必須先向學校管理員索取代碼並加入學校，然後在選單的帳號資訊切換帳號類型，如果你是學生則不需要加入學校。',
            '你尚未加入任何学校！如果你是老师，你必须先向学校管理员索取代码并加入学校，然后在选单的帐号资讯切换帐号类型，如果你是学生则不需要加入学校。'
          )
        }else{
          return '';
        }
      case 'courses':
        if(this.userType === 'student'){
          return this.func.multiLang(
            'You haven\'t joined any course yet!\n You need to ask your teacher for the course code in order to join a course!',
            '你尚未加入任何班別！你需要向你的老師索取班別代碼才能加入班別！',
            '你尚未加入任何班别！你需要向你的老师索取班别代码才能加入班别！'
          )
        }else if(this.userType === 'teacher'){
          return this.func.multiLang(
            'You haven\'t created any course yet!\n You can create courses by pressing the + button! You shall invite your students to join your course by telling them your course code which can be found in the course detail page!',
            '你尚未創建任何班別！你可以用 + 按鈕創建班別，然後把班別代碼告訴你的學生好讓他們加入！班別代碼可以在詳細資訊頁面找到！',
            '你尚未创建任何班别！你可以用 + 按钮创建班别，然后把班别代码告诉你的学生好让他们加入！班别代码可以在详细资讯页面找到！'
          )
        }else{
          return '';
        }
      case 'noSubject':
        return this.func.multiLang(
          'You haven\'t created any subject for this class yet!\n You can create subject by pressing the + button on the top right corner!',
          '你尚未為這個班別創建任何單元！你可以用右上方的 + 按鈕創建單元！',
          '你尚未为这个班别创建任何单元！你可以用右上方的 + 按钮创建单元！'
        )
      case 'noProject':
        return this.func.multiLang(
          'You haven\'t created any project for this subject yet!\n You can create project by pressing the + button on the top right corner!',
          '你尚未為這個單元創建任何專題研習！你可以用右上方的 + 按鈕創建專題研習！',
          '你尚未为这个单元创建任何专题研习！你可以用右上方的 + 按钮创建专题研习！'
        )
      default:
        return '';
    }
  }

}

export default Hints;
