import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class PickerOption extends UI {

  constructor(props){
    super(props);
    this.init(props);
    if(this.props.data){
      this.state = {
        filename: props.data.icon,
        type: props.type
      }
    }else{
      this.state = {
        status: ''
      }
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(!this.props.data){ return; }
    const newFilename = newProps.data.icon;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename }, ()=>{ this.checkUrl(); })
    }
  }

  async onCellSelect(){
    if(this.props.type === 'cardComment'){
      const targetCard = this.store.cards.selectedGradeCard;
      const card = this.props.data;
      targetCard['comment'] = card['comment'];
      this.actions.cards.gradeCard(targetCard.studentProject, 0, targetCard);
      document.getElementById('comment').value = card['comment'];
    }else{
      if(this.props.data){
        document.getElementById('title').value = this.props.data.title;
        document.getElementById('desc').value = this.props.data.description;
      }
      const url = this.props.url? this.props.url: this.url.url;
      const blob = await this.url.urlToBlob(url);
      this.actions.main.setPhoto({url: url, blob: blob});
    }

    if(this.props.onClick){
      this.props.onClick();
    }

    this.actions.main.setDefaultImagePicker('off');
    this.actions.main.setPrefabPicker('off');
  }

  render(){
    this.init(this.props);

    const cellStyle = {
      cursor: 'pointer',
      margin: this.bs.width * 0.01,
      flexShrink: 0
    }
    const type = this.props.type;
    const isComment = type === 'cardComment';
    const size = [this.bs.width * 0.125, this.bs.width * 0.125];

    const isOpen = this.state.status === 'pointed';
    return(
      <Motion defaultStyle={{scale: isOpen? 1: 3}}
      style={{scale: isOpen? spring(2.75): spring(1)}}>
        {style=>(
          <div style={{...cellStyle,...{width: isComment? '': size[0] * style.scale, height: isComment? '':size[1] * style.scale}}}
          onClick={()=>{ this.onCellSelect(); }}
          onPointerEnter={()=>{ this.setState({status: 'pointed' }); this.props.onPointed(); }}
          onPointerLeave={()=>{ this.setState({status: 'not-pointed' }); this.props.onUnPointed();}}>
            {!isComment && <img src={this.props.url? this.props.url: this.url.url} style={{width: '100%', height: '100%'}} alt=''/>}
            {isComment && this.textDisplay(this.props.data.comment, ['100%',''], this.bs.height * 0.075 * style.scale, 'center', 'white')}
          </div>
        )}
      </Motion>
    )
  }

}

export default PickerOption;
