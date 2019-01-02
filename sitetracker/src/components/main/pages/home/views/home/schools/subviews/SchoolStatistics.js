import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

class SchoolStatistics extends SubView {

  componentWillReceiveProps(newProps){
    if(!this.stat){
      this.stat = this.store.content.statistics[this.store.schools.viewingSchool._id];
    }
  }

  componentDidMount(){
    this.getSchoolStatistic();
  }

  getSchoolStatistic(){
    if(!this.stat){
      this.actions.schools.getStatistics(this.store.schools.viewingSchool._id);
    }
  }

  statTextDisplay(text){
    return this.textDisplay(text, ['100%',''], '100%', 'center');
  }

  render() {
    this.init(this.props);
    if(!this.stat){ return <div></div>; }
    const totalAmount = this.func.multiLang('Total amount: ','總數: ','总数: ');
    const totalPeople = this.func.multiLang('Total people: ','總人數: ','总人数: ');
    const totalFeatured = this.func.multiLang('Featured: ','精選: ','精选: ');

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Teachers','老師','老师'])}
        {this.sep()}
        {this.statTextDisplay(totalPeople + this.stat.schoolTeachers.length)}
        {this.gap('8%')}

        {this.subTitle(['Students','學生','学生'])}
        {this.sep()}
        {this.statTextDisplay(totalPeople + this.stat.schoolStudents.length)}
        {this.gap('8%')}

        {this.subTitle(['Classes','班別','班别'])}
        {this.sep()}
        {this.statTextDisplay(totalAmount + this.stat.schoolCourses.length)}
        {this.gap('8%')}

        {this.subTitle(['Units','單元','单元'])}
        {this.sep()}
        {this.statTextDisplay(totalAmount + this.stat.schoolSubjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Projects','專題研習','专题研习'])}
        {this.sep()}
        {this.statTextDisplay(totalAmount + this.stat.schoolProjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Cards','卡片','卡片'])}
        {this.sep()}
        {this.statTextDisplay(totalAmount + this.stat.schoolCards.length)}
        {this.statTextDisplay(totalFeatured + this.stat.featured)}
        {this.gap('8%')}

        {this.subTitle(['Langs','語言欄','语言栏'])}
        {this.sep()}
        {this.statTextDisplay(totalAmount + this.stat.schoolLangs.length)}
        {this.gap('8%')}
      </div>
    )
  }

}

export default SchoolStatistics;
