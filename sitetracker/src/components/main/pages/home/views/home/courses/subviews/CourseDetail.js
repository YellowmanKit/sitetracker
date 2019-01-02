import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';

class CourseDetail extends SubView {

  render() {
    this.init(this.props);
    const course = this.store.courses.viewingCourse;
    const teacher = this.func.getById.profileByUser(course.teacher, this.store);

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        {this.gap('2%')}
        <Image app={this.app} filename={course.icon} type={'courseIcon'} size={this.bs.height * 0.22}/>
        {this.gap('2%')}

        {this.subTitle(['Leader','隊長','队长'])}
        {this.sep()}
        {this.detailText(teacher? teacher.name: '')}
        {this.gap('2%')}

        {this.subTitle(['Title','隊名','队名'])}
        {this.sep()}
        {this.detailText(course.title)}
        {this.gap('2%')}

        {this.subTitle(['Start date','創建於','创建于'])}
        {this.sep()}
        {this.detailText(this.func.dateString(new Date(course.createdAt)))}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期','结束日期'])}
        {this.sep()}
        {this.detailText(this.func.dateString(new Date(course.endDate)))}
        {this.gap('2%')}

        {this.subTitle(['Code','代碼','代码'])}
        {this.sep()}
        {this.detailText(course.code)}
        {this.gap('6%')}
      </div>
    )
  }

}

export default CourseDetail;
