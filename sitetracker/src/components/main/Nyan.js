import React from 'react';
import UI from 'components/UI';

import sit1 from 'resources/images/nyan/sit/sit1.png';
import sit2 from 'resources/images/nyan/sit/sit2.png';

import running_left1 from 'resources/images/nyan/running/running_left1.png';
import running_left2 from 'resources/images/nyan/running/running_left2.png';
import running_left3 from 'resources/images/nyan/running/running_left3.png';
import running_left4 from 'resources/images/nyan/running/running_left4.png';

import running_up1 from 'resources/images/nyan/running/running_up1.png';
import running_up2 from 'resources/images/nyan/running/running_up2.png';
import running_up3 from 'resources/images/nyan/running/running_up3.png';
import running_up4 from 'resources/images/nyan/running/running_up4.png';

import running_down1 from 'resources/images/nyan/running/running_down1.png';
import running_down2 from 'resources/images/nyan/running/running_down2.png';
import running_down3 from 'resources/images/nyan/running/running_down3.png';
import running_down4 from 'resources/images/nyan/running/running_down4.png';

import ennui1 from 'resources/images/nyan/ennui/ennui1.png';
import ennui2 from 'resources/images/nyan/ennui/ennui2.png';
import ennui3 from 'resources/images/nyan/ennui/ennui3.png';
import ennui4 from 'resources/images/nyan/ennui/ennui4.png';

import fly1 from 'resources/images/nyan/fly/fly1.png';
import fly2 from 'resources/images/nyan/fly/fly2.png';
import fly3 from 'resources/images/nyan/fly/fly3.png';
import fly4 from 'resources/images/nyan/fly/fly4.png';

import sniff1 from 'resources/images/nyan/sniff/sniff1.png';
import sniff2 from 'resources/images/nyan/sniff/sniff2.png';

import lick1 from 'resources/images/nyan/lick/lick1.png';
import lick2 from 'resources/images/nyan/lick/lick2.png';

import tail1 from 'resources/images/nyan/tail/tail1.png';
import tail2 from 'resources/images/nyan/tail/tail2.png';
import tail3 from 'resources/images/nyan/tail/tail3.png';

import relax1 from 'resources/images/nyan/relax/relax1.png';
import relax2 from 'resources/images/nyan/relax/relax2.png';
import relax3 from 'resources/images/nyan/relax/relax3.png';
import relax4 from 'resources/images/nyan/relax/relax4.png';

import sleep1 from 'resources/images/nyan/sleep/sleep1.png';
import sleep2 from 'resources/images/nyan/sleep/sleep2.png';
import sleep3 from 'resources/images/nyan/sleep/sleep3.png';
import sleep4 from 'resources/images/nyan/sleep/sleep4.png';

import stretch1 from 'resources/images/nyan/stretch/stretch1.png';
import stretch2 from 'resources/images/nyan/stretch/stretch2.png';
import stretch3 from 'resources/images/nyan/stretch/stretch3.png';
import stretch4 from 'resources/images/nyan/stretch/stretch4.png';


class Nyan extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      animations: {
        sit: {
          frames: [sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit2],
          time: 300
        },
        runningLeft: {
          frames: [running_left1, running_left2, running_left3, running_left4],
          time: 125
        },
        runningUp: {
          frames: [running_up1, running_up2, running_up3, running_up4],
          time: 125
        },
        runningDown: {
          frames: [running_down1, running_down2, running_down3, running_down4],
          time: 125
        },
        ennui: {
          frames: [ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui1, ennui2, ennui3, ennui4, ennui3, ennui2],
          time: 200
        },
        fly: {
          frames: [fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly4, fly2, fly1, fly2, fly3, fly2],
          time: 150
        },
        sniff: {
          frames: [sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff1, sniff2, sniff1, sniff2, sniff1],
          time: 175
        },
        tail: {
          frames: [tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail1, tail2, tail3, tail2],
          time: 175
        },
        lick: {
          frames: [lick2, lick2, lick2, lick2, lick1, lick2, lick1, lick2],
          time: 250
        },
        relax: {
          frames: [relax1, relax2, relax3, relax4],
          time: 200
        },
        sleep: {
          frames: [sleep1, sleep2, sleep3, sleep4, sleep3, sleep2],
          time: 300
        },
        stretch: {
          frames: [stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch4, stretch3, stretch2, stretch1, stretch1, stretch1, stretch1, stretch2, stretch3],
          time: 150
        },
      },
      count: 0
    }
    this.playAnimation();
  }

  componentDidMount(){
    this.playAnimation();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    //if(this.store.modal.status === 'off'){ clearTimeout(this.animation); }
    if(!this.animation){ this.playAnimation(); }
  }

  componentWillUnmount(){ clearTimeout(this.animation); }

  playAnimation(){
    if(this.props.status === 'off'){ return null; }
    clearTimeout(this.animation);
    this.animation = setTimeout(()=>{
      this.nextFrame();
      this.playAnimation();
    }, this.state.animations[this.props.status].time)
  }

  nextFrame(){
    var count = this.state.count;
    count++;
    if(count > this.state.animations[this.props.status].frames.length - 1){
      count = 0;
    }
    this.setState({
      count: count
    })
  }

  render(){
    this.init(this.props);
    const size = this.props.size;
    const nyanStyle = {
      width: size[0],
      height: size[1],
      flexShrink: 0,
      pointerEvents: this.props.isOpen? 'all': '',
      cursor: this.props.onClick? 'pointer':''
    }
    if(this.props.status === 'off'){ return <img src={this.state.animations['sit'].frames[0]} style={nyanStyle} alt=''/> }

    var count = this.state.count;
    const length = this.state.animations[this.props.status].frames.length;
    if(count >= length){ count = 0; }
    const url = this.state.animations[this.props.status].frames[count];

    return (
      <img onClick={this.props.onClick} src={url} style={nyanStyle} alt=''/>
    )
  }
}

export default Nyan;
