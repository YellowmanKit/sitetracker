import React from 'react';
import View from 'components/main/pages/home/views/View';

class AddAdmin extends View {

  render() {
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['User id','用戶名稱', '用户名称'])}
        {this.sep()}
        {this.inputs.inputField('userId','text', '', '')}
        {this.gap('2%')}

        {this.buttons.rectGreen(['Confirm','確定','确定'], ()=>{this.addAdmin()})}
      </div>
    )
  }

  addAdmin(){
    const userId = document.getElementById('userId').value;
    if(userId === ''){
      return this.failedMessage(['Failed to add!', '操作失敗!', '操作失败!'])
    }

    this.actions.user.addAdmin({
      userId: userId
    });
  }
}

export default AddAdmin;
