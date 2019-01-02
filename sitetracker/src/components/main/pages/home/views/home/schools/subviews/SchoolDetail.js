import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';

class CourseDetail extends SubView {

  render() {
    this.init(this.props);
    const school = this.store.schools.viewingSchool;

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        {this.gap('2%')}
        <Image app={this.app} filename={school.icon} type={'schoolIcon'} size={this.bs.height * 0.22}/>
        {this.gap('2%')}

        {this.subTitle(['School name','校名','校名'])}
        {this.sep()}
        {this.detailText(school.name)}
        {this.gap('2%')}

        {this.subTitle(['Description','描述','描述'])}
        {this.sep()}
        {this.detailText(school.description)}
        {this.gap('2%')}

        {this.subTitle(['Start date','創建於','创建于'])}
        {this.sep()}
        {this.detailText(this.func.dateString(new Date(school.createdAt)))}
        {this.gap('2%')}

        {this.subTitle(['Code','代碼','代码'])}
        {this.sep()}
        {this.detailText(school.code)}
        {this.gap('6%')}
      </div>
    )
  }

}

export default CourseDetail;
