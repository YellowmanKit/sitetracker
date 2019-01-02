import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import Nyan from 'components/main/Nyan';
import Cloud from './Cloud';

class Notice extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      nyan: 'ennui'
    }
    this.actions.notices.init(this.store, this.actions);
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.setNyan(this.store.notices.status);
  }

  setNyan(status){
    if((this.isEmpty() ||  status === 'off') && this.state.nyan === 'sniff'){
      this.setState({
        nyan: this.func.randomNyan()
      })
    }else if((!this.isEmpty() &&  status !== 'off') && this.state.nyan !== 'sniff'){
      this.setState({
        nyan: 'sniff'
      })
    }
  }

  render(){
    this.init(this.props);

    const view = this.store.content.view;
    if(view && !view.includes('Home')){ return null; }

    const status = this.store.notices.status;

    const noticeStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.5,
      display: 'flex',
      justifyContent: 'flex-start',
      flexFlow: 'column nowrap',
      position: 'absolute',
      right: this.bs.height * 0.025,
      bottom: this.bs.height * 0.025,
      alignItems: 'flex-end',
      pointerEvents: 'none'
    }}
    const nyanSize = [this.bs.height * 0.075, this.bs.height * 0.075];

    return(
      <div style={noticeStyle}>
        {this.noticesCloud()}
        {this.amountTag(status === 'off')}
        <Nyan app={this.app} isOpen={true} status={this.state.nyan} size={nyanSize} onClick={()=>{this.onNyanClicked()}}/>
      </div>
    )
  }

  noticesCloud(){
    return this.store.notices.notices.map((notice,i)=>{
      if(notice.dead){ return null; }
      return <Cloud key={i} app={this.app} notice={notice} status={this.store.notices.status} index={i}/>
    })
  }

  amountTag(isOpen){
    var count = this.getCount();
    if(count === 0){ return null; }

    const cloudStyle = {...this.ui.styles.container, ...this.ui.styles.cloud, ...this.ui.styles.border, ...{
      width: this.bs.height * 0.03,
      height: this.bs.height * 0.03,
      position: 'absolute',
      right: this.bs.height * 0.025,
      bottom: this.bs.height * 0.06,
      fontSize: this.bs.height * 0.025
    }}
    return(
      <Motion defaultStyle={{opacity: 0}}
      style={{opacity: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...cloudStyle, ...{opacity: style.opacity}}} onClick={this.onNyanClicked.bind(this)}>
            {count}
          </div>
        )}
      </Motion>
    )
  }

  getCount(){
    const notices = this.store.notices.notices;
    var count = 0;
    for(var i=0;i<notices.length;i++){
      if(!notices[i].dead && !notices[i].killed){ count++; }
    }
    return count;
  }

  isEmpty(){
    const count = this.getCount();
    return count === 0;
  }

  onNyanClicked(){
    if(!this.isEmpty()){
      this.actions.notices.toggleNotice();
    }else{
      this.setState({ nyan: this.func.randomNyan() })
    }
  }
}

export default Notice;
