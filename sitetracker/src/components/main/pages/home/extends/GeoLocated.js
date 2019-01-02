import React from 'react';
import {geolocated} from 'react-geolocated';

class GeoLocated extends React.Component {

  componentWillReceiveProps(newProps){
    const status = newProps.app.store.main.geoLocated;
    if(status === 'processing'){
      this.saveCoords(newProps);
    }
  }

  saveCoords(newProps){
    setTimeout(()=>{
      if(this.props.coords){
        console.log(this.props.coords);
        newProps.app.actions.main.setGeoLocated(this.props.coords);
      }else{
        this.saveCoords(newProps);
      }
    }, 1000);
  }

  render(){
    return null;
  }

}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocated);
