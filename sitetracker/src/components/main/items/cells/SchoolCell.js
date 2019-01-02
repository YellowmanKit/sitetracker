import Cell from './Cell';

class SchoolCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      title: props.data.name,
      size: [this.bs.height * 0.325,this.bs.height * 0.215],
      filename: props.data.icon,
      type: 'schoolIcon',
      status: 'init'
    }
    this.checkUrl();
  }

}

export default SchoolCell;
