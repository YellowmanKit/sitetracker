import React from 'react';
import View from 'components/main/pages/home/views/View';

class Credit extends View {

  creditTextDisplay(text){
    return this.textDisplay(this.func.multiLang(text[0],text[1],text[2]), ['100%',''], '125%', 'center');
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Organization','團體','团体'])}
        {this.sep()}
        {this.creditTextDisplay(
          ['The University of Hong Kong',
          '香港大學',
          '香港大学'])}
        {this.creditTextDisplay(
          ['Hong Kong Applied Science and Technology Research Institute',
          '香港應用科技研究院',
          '香港应用科技研究院'])}
        {this.gap('8%')}

        {this.subTitle(['Director','監督','监督'])}
        {this.sep()}
        {this.creditTextDisplay(
          ['Dr. Elizabeth Loh',
          '羅嘉怡博士',
          '罗嘉怡博士'])}
        {this.creditTextDisplay(
          ['Dr. Vincent Lau',
          '劉文建博士',
          '刘文建博士'])}
        {this.creditTextDisplay(
          ['Dr. W.W. Ki',
          '祁永華博士',
          '祁永华博士'])}
        {this.creditTextDisplay(
          ['Dr. K.C. Lau',
          '劉國張博士',
          '刘国张博士'])}
        {this.gap('4%')}

        {this.subTitle(['Developer','開發者','开发者'])}
        {this.sep()}
        {this.creditTextDisplay(
          ['Mr. Wong Yan Kit',
          '黃人傑先生',
          '黄人杰先生'])}
        {this.gap('4%')}
      </div>
    )
  }
}

export default Credit;
