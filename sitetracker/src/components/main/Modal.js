import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';
import Nyan from './Nyan';

import paperBox from 'resources/images/general/paperBox.png';

class Modal extends UI {

  componentDidMount(){
    this.count = 0;
  }

  componentWillReceiveProps(newProps){
    this.count = this.count + 1;
  }

  board(){
    const boardStyle = {
      width: this.bs.height * 0.4,
      height:  this.bs.height * 0.4,
      borderRadius: '20px',
      backgroundImage: 'url(' + paperBox + ')',
      backgroundSize: '100% 100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
    const nyanStatus =
    this.store.modal.status === 'off'? 'off':
    this.store.modal.button === 'off'? 'runningLeft':'sit';
    const nyanSize = [this.bs.height * 0.1, this.bs.height * 0.1];

    return(
      <div style={boardStyle}>
        <div style={{height: '10%'}} />
        {this.message()}
        <Nyan status={nyanStatus} size={nyanSize} app={this.app}/>
        {this.buttonsArea()}
      </div>
    )
  }

  message(){
    const modal = this.store.modal;
    const lang = this.store.main.language;
    const text = modal[lang];

    return <div style={this.ui.styles.modal}>{text}</div>
  }

  buttonsArea(){
    const status = this.store.modal.button;
    const showBtn = status !== 'off';
    const onConfirm = status === 'confirm'? this.store.modal.onConfirm: ()=>{};
    const onCancel = this.store.modal.onCancel? this.store.modal.onCancel: ()=>{};

    const areaStyle = {
      width: '85%',
      height: '65%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexShrink: 0
    }
    return(
      <div style={areaStyle}>
        {showBtn && this.buttons.modal(['Confirm','確定','确定'], ()=>{ onConfirm(); this.actions.modal.hideModal(); })}
        {status === 'confirm' && this.buttons.modal(['Cancel','取消','取消'], ()=>{ onCancel(); this.actions.modal.hideModal();
        })}
      </div>
    )
  }

  render() {
    this.init(this.props);
    const status = this.store.modal.status;
    const isOpen = status !== 'off';

    const modalStyle = {
      position: 'absolute',
      width: this.bs.width,
      height: this.bs.height,
      minHeight: this.bs.minHeight,
      backgroundColor: 'rgba(0,0,0,0.5)',
      opacity: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: isOpen? 'auto': 'none'
    }
    return(
      <Motion defaultStyle={{opacity: 0}}
      style={{opacity: isOpen? spring(1.5):spring(0)}}>
        {style=>(
          <div key={status + this.count} style={{...modalStyle,
            ...{opacity: style.opacity}}}>
            {this.board()}
          </div>
        )}
      </Motion>
    )
  }

}

export default Modal;
