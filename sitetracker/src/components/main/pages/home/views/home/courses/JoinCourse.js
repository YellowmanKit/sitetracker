import React from 'react';
import View from 'components/main/pages/home/views/View';

class JoinCourse extends View {

  render() {
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Course Code','班別代碼','班别代码'])}
        {this.sep()}
        {this.inputs.inputField('code','text', '', '')}
        {this.gap('2%')}

        {this.buttons.rectGreen(['Confirm','確定','确定'], ()=>{this.joinCourse()})}
      </div>
    )
  }

  joinCourse(){
    const _code = document.getElementById('code').value;
    if(_code === ''){
      return this.failedMessage(['Failed to join! Code is missing!', '操作失敗! 未填入班別代碼!', '操作失败! 未填入班别代码!'])
    }
    const joinedCourses = this.store.courses.joinedCourses;
    for(var i=0;i<joinedCourses.length;i++){
      if(joinedCourses[i].code === _code){
        return this.failedMessage(['You already joined this course!', '此班別已經加入!', '此班别已经加入!'])
      }
    }

    this.actions.courses.joinCourse({
      userId: this.store.user._id,
      code: _code
    });
  }
}

export default JoinCourse;
