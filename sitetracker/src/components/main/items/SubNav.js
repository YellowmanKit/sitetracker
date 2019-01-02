import React from 'react';
import UI from 'components/UI';

class SubNav extends UI {

  subNavOptions(){
    const areaStyle = {...this.ui.styles.area, ...{
      height: '100%',
      alignItems: 'center',
      flexGrow: 1
    }}
    const optionStyle = {...this.ui.styles.button, ...{
      width: '100%',
      height: '100%'
    }}
    const tagStyle = {
      width: '100%',
      fontSize: this.bs.width * 0.035,
      textAlign: 'center'
    }

    const length = this.props.options.length;
    return this.props.options.map((option,i)=>{
      const selected = option.subView === this.store.content.subView;
      return(
        <div key={i} style={{...areaStyle, ...{backgroundColor: selected? 'white': 'transparent'}}}>
          <button style={optionStyle}
          onClick={()=>{
            this.actions.content.setSubView(option.subView);
            setTimeout(()=>{ this.actions.main.setStatus('ready'); }, 100)
          }}>
            <div style={Object.assign({},tagStyle,{color: selected? this.ui.colors.selectedGrey: this.ui.colors.grey})}>{this.func.multiLang(option.tag[0],option.tag[1],option.tag[2])}</div>
          </button>
          {i < length && this.verSep(this.ui.colors.darkGrey, '70%')}
        </div>
      )
    })
  }

  render(){
    this.init(this.props);
    const style = {...this.ui.styles.area, ...{
      height: this.bs.height * 0.05,
      backgroundColor: this.ui.colors.ultraLightGrey
    }};
    return (
      <div style={style}>
        {this.subNavOptions()}
      </div>
    )
  }
}

export default SubNav;
