import React from 'react';
import View from 'components/main/pages/home/views/View';

class JoinCourse extends View {

  render() {
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Course Code','學校代碼', '学校代码'])}
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
      return this.failedMessage(['Failed to join! School is missing!', '操作失敗! 未填入學校代碼!', '操作失败! 未填入学校代码!'])
    }
    const joinedCourses = this.store.courses.joinedCourses;
    for(var i=0;i<joinedCourses.length;i++){
      if(joinedCourses[i].code === _code){
        return this.failedMessage(['You already joined this school!', '此學校已經加入!', '此学校已经加入!'])
      }
    }

    this.actions.schools.joinSchool({
      userId: this.store.user._id,
      code: _code
    });
  }
}

export default JoinCourse;
