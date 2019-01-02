import React from 'react';
import MediaQuery from 'react-responsive';

import UI from 'components/UI';
import Image from 'components/main/items/ui/Image';

class ImagePicker extends UI {

  render() {
    this.init(this.props);

    const pickerStyle = {
      width: '100%',
      height: this.bs.height * 0.25,
      backgroundColor: this.ui.colors.lightGrey,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0
    }
    const toolBarStyle = {
      width: this.bs.height * 0.13,
      height: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      marginLeft: '2%'
    }
    const imgUrl =
    this.store.main.photoUrl? this.store.main.photoUrl:
    this.props.defaultUrl? this.props.defaultUrl:
    null;

    const buttonSize = this.bs.height * 0.1;

    return(
      <div style={pickerStyle}>
        <div style={toolBarStyle}>
          {this.props.type !== 'card' && this.buttons.selectDefaultImage(buttonSize, this.props.type)}
        </div>
        {this.verSep('white', '90%')}
        {this.verGap('2%')}
        <Image app={this.app} photoUrl={imgUrl} size={this.bs.height * 0.22}/>
        {this.verGap('2%')}
        {this.verSep('white', '90%')}
        <div style={toolBarStyle}>
          {this.props.type !== 'card' && this.buttons.selectImage(buttonSize)}
          <MediaQuery minDeviceWidth={1224}>
            {this.buttons.takePicture(buttonSize)}
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1224}>
            {this.buttons.mobileTakePicture(buttonSize)}
          </MediaQuery>
        </div>
      </div>
    )
  }

  onRotate(){

  }
}

export default ImagePicker;
