import Cell from './Cell';

class CardCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    const firstLang = this.func.getById.lang(this.props.data.langs[0], this.store);
    const title = firstLang? firstLang.text: '';

    this.state = {
      title: title,
      size: [this.bs.height * 0.25, this.bs.height * 0.35],
      filename: props.data.icon,
      type: 'cardIcon',
      status: 'init'
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const firstLang = this.func.getById.lang(this.props.data.langs[0], this.store);
    const title = firstLang? firstLang.text: '';
    if(title !== this.state.title){
      this.setState({ title: title })
    }
    this.checkUrl();
  }

}

export default CardCell;
