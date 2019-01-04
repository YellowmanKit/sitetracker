import React from 'react';
import {geolocated} from 'react-geolocated';

class GeoLocated extends React.Component {

  componentDidMount(){
    this.saveCoords();
  }

  saveCoords(){
    setTimeout(()=>{
      if(this.props.coords){
        console.log(this.props.coords);
        this.props.app.actions.main.setGeoLocated(this.props.coords);
      }else{
        this.saveCoords();
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
