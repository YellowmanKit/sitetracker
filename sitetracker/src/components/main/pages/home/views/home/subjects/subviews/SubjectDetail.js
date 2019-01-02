import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';
import mlanghku from 'resources/images/icons/mlanghku.png';

class SubjectDetail extends SubView {

  render() {
    this.init(this.props);
    const subject = this.store.subjects.viewingSubject;
    const course = this.func.getById.course(subject.course, this.store);
    if(!course){ return null; }
    const photoUrl = subject.mlanghku? mlanghku: null;
    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        {this.gap('2%')}
        <Image app={this.app} photoUrl={photoUrl} filename={subject.icon} type={'subjectIcon'} size={this.bs.height * 0.22}/>
        {this.gap('2%')}

        {this.subTitle(['Group','組別','组别'])}
        {this.sep()}
        {this.detailText(course.title, 'subjectCourse')}
        {this.gap('2%')}

        {this.subTitle(['Title','標題','标题'])}
        {this.sep()}
        {this.detailText(subject.title, 'subjectTitle')}
        {this.gap('2%')}

        {this.subTitle(['Description','描述','描述'])}
        {this.sep()}
        {subject.description.split('\n').map(desc=>{return this.detailText(desc, 'subjectDesc')})}
        {this.gap('2%')}

        {this.subTitle(['Start date','創建於','创建于'])}
        {this.sep()}
        {this.detailText(this.func.dateString(new Date(subject.createdAt)), 'subjectCreatedAt')}
        {this.gap('2%')}

      </div>
    )
  }

}

export default SubjectDetail;
