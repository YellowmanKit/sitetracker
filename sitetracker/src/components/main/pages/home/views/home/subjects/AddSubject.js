import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

class Addsubject extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.subject = this.store.subjects.viewingSubject;
    this.state = {
      modified: false,
      filename: this.subject.icon,
      type: 'subjectIcon',
    }
    this.checkUrl();
  }

  render() {
    this.init(this.props);
    var defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 1);

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        <ImagePicker type={'subject'} defaultUrl={this.url.url} app={this.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','標題','标题'])}
        {this.sep()}
        {this.inputs.inputField('title','text', '', this.props.editMode? this.subject.title:'' , ()=>{ this.setState({modified: true})})}
        {this.gap('2%')}

        {this.subTitle(['Description','描述','描述'])}
        {this.sep()}
        {this.gap('2%')}
        {this.inputs.textArea('desc', '', this.props.editMode? this.subject.description:'', ()=>{ this.setState({modified: true})})}
        {this.gap('4%')}

        {this.buttons.rectGreen(['Confirm','確定','确定'], ()=>{this.addSubject()})}
        {this.gap('4%')}
      </div>
    )
  }

  addSubject(){
    const editMode = this.props.editMode;
    const newIconBlob = this.store.main.photoBlob;
    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;

    if(!editMode && newIconBlob === null){
      return this.failedMessage(['Failed to add! Icon is missing!', '創建失敗! 未有照片!','创建失败! 未有照片!'])
    }
    if(title.length === 0){
      return this.failedMessage(['Failed to add! Title is missing!', '創建失敗! 未填標題!','创建失败! 未填标题!'])
    }

    if(!editMode){
      this.actions.subjects.addSubject({
        course: this.store.courses.viewingCourse._id,
        icon: newIconBlob,
        title: title,
        description: description
      });
    }else if(newIconBlob || this.state.modified){
      this.actions.subjects.editSubject({...this.subject, ...{
        newIcon: newIconBlob,
        title: title,
        description: description
      }})
    }else{
      return this.failedMessage(['Failed to add! Nothing is modified!', '提交失敗!未作出更改!', '提交失败!未作出更改!'])
    }
  }

}

export default Addsubject;
