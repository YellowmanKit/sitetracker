import React from 'react';
import UI from 'components/UI';

class Filter extends UI {

  render(){
    this.init(this.props);

    const style = {...this.bs, ...this.ui.styles.container, ...{
      width: this.bs.width,
      height: this.bs.width * 0.06,
      backgroundColor: this.ui.colors.ultraLightGrey
    }}

    return(
      <div style={style}>
        {this.inputs.optionBar('filter', ['100%','100%'], this.props.options, this.props.defaultValue, this.props.onChange)}
      </div>
    )
  }
}

export default Filter;
