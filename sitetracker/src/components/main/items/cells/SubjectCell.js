import Cell from './Cell';

class SubjectCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      title: props.data.title,
      size: [this.bs.height * 0.2, this.bs.height * 0.2],
      filename: props.data.icon,
      type: 'subjectIcon',
      status: 'init',
      alert: this.func.checkAlert.subject(this.props.data, this.props.app)
    }
    this.checkUrl();
  }

}

export default SubjectCell;
