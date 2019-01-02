import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

class AddSchool extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.school = this.store.schools.viewingSchool;
    this.state = {
      modified: false,
      filename: this.school.icon,
      type: 'schoolIcon',
    }
    this.checkUrl();
  }

  render() {
    this.init(this.props);
    var defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() + 1);

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        <ImagePicker type={'school'} defaultUrl={this.url.url} app={this.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['School name','校名','校名'])}
        {this.sep()}
        {this.inputs.inputField('title','text', '', this.props.editMode? this.school.name:'' , ()=>{ this.setState({modified: true})})}
        {this.gap('2%')}

        {this.subTitle(['Description','描述','描述'])}
        {this.sep()}
        {this.gap('2%')}
        {this.inputs.textArea('desc', '', this.props.editMode? this.school.description:'', ()=>{ this.setState({modified: true})})}
        {this.gap('4%')}

        {this.buttons.rectGreen(['Confirm','確定','确定'], ()=>{this.addSchool()})}
        {this.gap('2%')}
      </div>
    )
  }

  addSchool(){
    const editMode = this.props.editMode;
    const icon = this.store.main.photoBlob;
    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;

    if(!editMode && icon === null){
      return this.failedMessage(['Failed to add! Icon is missing!', '提交失敗! 未有照片!','提交失败! 未有照片!'])
    }
    if(title.length === 0){
      return this.failedMessage(['Failed to add! Title is missing!', '提交失敗! 未填校名!','提交失败! 未填校名!'])
    }

    if(!editMode){
      this.actions.schools.addSchool({
        admin: this.store.user._id,
        icon: icon,
        name: title,
        description: description
      })
    }else if(icon || this.state.modified){
      this.actions.schools.editSchool({...this.school, ...{
        newIcon: icon,
        name: title,
        description: description
      }})
    }else{
      return this.failedMessage(['Failed to add! Nothing is modified!', '提交失敗!未作出更改!', '提交失败!未作出更改!'])
    }
  }
}

export default AddSchool;
