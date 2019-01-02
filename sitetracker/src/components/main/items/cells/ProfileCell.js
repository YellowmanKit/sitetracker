import Cell from './Cell';

class ProfileCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      title: props.data.name,
      size: [this.bs.height * 0.2, this.bs.height * 0.2],
      margin: this.bs.height * 0.0125,
      filename: props.data.icon,
      type: 'profileIcon',
      status: 'init'
    }
    this.checkUrl();
  }

}

export default ProfileCell;
