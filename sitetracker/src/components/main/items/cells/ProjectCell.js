import Cell from './Cell';

class ProjectCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      title: props.data.title,
      titleSize: this.bs.height * 0.015,
      marginRight: this.bs.height * 0.0125,
      alertSize: this.bs.width * 0.025,
      alertPosi: this.bs.width * -0.0125,
      size: [this.bs.height * 0.15, this.bs.height * 0.15],
      filename: props.data.icon,
      type: 'projectIcon',
      status: 'init',
      alert: this.func.checkAlert.project(this.props.data, this.props.app)
    }
    this.checkUrl();
  }

}

export default ProjectCell;
