import React from 'react';
import UI from 'components/UI';

//import no_image from 'resources/images/general/no_image.png';

class TakePicture extends UI {

  image(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const imgStyle = {
      width: bs.width * 0.75,
      height: bs.width * 0.75,
      backgroundColor: 'rgba( 1, 1, 1, 0.25)'
    }
    return <img style={imgStyle} src={app.store.main.photo} alt='' />
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const pageStyle = Object.assign({},ui.basicStyle,{
      backgroundColor: 'white',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start'
    })
    //const func = app.functions;
    return(
      <div style={pageStyle}>
        {this.gap('4%')}
        {this.image()}
      </div>
    )
  }

}

export default TakePicture;
