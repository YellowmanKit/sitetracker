import Cell from './Cell';

class CourseCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      title: props.data.title,
      marginRight: this.bs.height * 0.025,
      size: [this.bs.height * 0.215,this.bs.height * 0.215],
      filename: props.data.icon,
      type: 'courseIcon',
      status: 'init',
      outDated: this.func.outDated(this.props.data.endDate)
    }
    this.checkUrl();
  }

}

export default CourseCell;
