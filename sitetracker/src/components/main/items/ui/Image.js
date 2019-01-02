import React from 'react';
import UI from 'components/UI';

import no_image from 'resources/images/general/no_image.png';

class Image extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: props.filename,
      type: props.type
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const newFilename = newProps.filename;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename }, ()=>{ this.checkUrl(); })
    }
    this.checkUrl();
  }

  render(){
    this.init(this.props);
    const url = this.props.photoUrl? this.props.photoUrl: this.url.url;
    //console.log(url);
    const size = this.props.size? this.props.size: '100%';
    const scale = this.props.scale;

    var containerStyle = {...this.ui.styles.container, ...{
      width: this.props.size? size: scale[0],
      height: this.props.size? size: scale[1],
      backgroundColor: this.props.backgroundColor? this.props.backgroundColor: 'white',
    }}
    if(!this.props.noBorder){
      containerStyle = {...this.ui.styles.border, ...containerStyle}
    }
    const imgBg = url? null: no_image;
    const imgSize = this.props.size? size * 0.95: '95%';
    const backgroundStyle = {...this.ui.styles.container, ...{
      width: imgSize,
      height: imgSize,
      backgroundImage: 'url(' + imgBg + ')'
    }}
    const buttonStyle = {...this.ui.styles.button, ...{
      width: this.props.size? size: scale[0],
      height: this.props.size? size: scale[1],
      position: 'absolute',
      opacity: 0
    }}

    return(
      <div key={url} style={containerStyle}>
        <div style={backgroundStyle}>
          <img style={{maxWidth: size, maxHeight: size}} src={url} alt=''/>
          {url !== null && this.buttons.button(buttonStyle, ['',''], '',this.props.noEnlarge? null:()=>{this.onImageClick()})}
        </div>
      </div>
    )
  }

  onImageClick(){
    if(!this.props.photoUrl && !this.url.url){ return; }
    this.actions.main.enlargeImage(this.props.photoUrl? this.props.photoUrl: this.url.url);
  }

}

export default Image;
