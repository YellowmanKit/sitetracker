import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import PickerOption from './PickerOption';

class PrefabPicker extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      pointedCell: null
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
  }

  prefabs(){
    const prefabsStyle = {...this.ui.styles.container, ...this.ui.styles.area, ...{
      width: this.bs.width,
      height:this.bs.height * 0.45,
      overflowX: 'scroll',
      justifyContent: 'flex-start'
    }}
    const prefabsStyleY = {...this.ui.styles.container, ...this.bs, ...{
      width: this.bs.width,
      height: '',
      overflowY: 'scroll',
      justifyContent: 'center'
    }}

    const status = this.store.main.prefabPicker;
    if(status === 'off'){ return null;}
    var type = status === 'comments'? 'cards': status;
    var data = this.removeDuplicates(this.store[type][type].slice(0), status);

    return(
      <div style={status === 'comments'? prefabsStyleY: prefabsStyle}>
        {this.verGap('8%')}
        {data.map((item, i)=>{
          return(
            <PickerOption
            key={i} index={i} app={this.app}
            data={item} type={this.getTypeName(status)}
            onPointed={()=>{ this.setState({pointedCell: item}); }} onUnPointed={()=>{ this.setState({pointedCell: null}); }}/>
          )
        })}
        {this.verGap('8%')}
      </div>
    )
  }

  removeDuplicates(data, status){
    for(var i=0;i<data.length;i++){
      for(var j=0;j<data.length;j++){
        if(!data[i]){ continue; }
        if(!data[j]){ continue; }
        if(status === 'comments'){
          if(!data[i].comment){
            data.splice(i, 1);
            i--;
          }else if(data[i].comment.length === 0){
            data.splice(i, 1);
            i--;
          }
        }

        if(status !== 'comments' &&
          i !== j &&
          data[i].title === data[j].title &&
          data[i].description === data[j].description){
          data.splice(i, 1);
          i--;
        }

        if(data[i] && data[i].mlanghku){
          data.splice(i, 1);
          i--;
        }
      }
    }
    return data;
  }

  getTypeName(status){
    switch (status) {
      case 'subjects':
        return 'subjectIcon'
      case 'projects':
        return 'projectIcon'
      case 'comments':
        return 'cardComment'
      default:
        return ''
    }
  }

  pickerText(text){
    const textStyle = {
      fontSize: this.bs.height * 0.075,
      color: 'white'
    }
    return(
      <div style={textStyle}>
        {text}
      </div>
    )
  }

  render() {
    this.init(this.props);
    const status = this.store.main.prefabPicker;
    //console.log(this.buttons.bs)
    const isOpen = status !== 'off';

    const pickerStyle = {...this.bs, ...this.ui.styles.container, ...{
      position: 'absolute',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.95)',
      pointerEvents: isOpen? 'auto': 'none'
    }}

    return(
      <Motion defaultStyle={{opacity: this.atHome? 0: isOpen?0:1.5}}
      style={{opacity: this.atHome? 0: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...pickerStyle, ...{opacity: style.opacity}}}>
            {this.buttons.absoluteClose(()=>{this.actions.main.setPrefabPicker('off')})}
            {status !== 'comments' && this.state.pointedCell && this.pickerText(this.state.pointedCell.title)}
            {this.prefabs()}
            {status !== 'comments' && this.state.pointedCell && this.pickerText(this.state.pointedCell.description)}
          </div>
        )}
      </Motion>
    )
  }

}

export default PrefabPicker;
