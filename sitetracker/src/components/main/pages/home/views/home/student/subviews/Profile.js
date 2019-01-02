import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';


class Profile extends SubView {

    render() {
      this.init(this.props);
      const profile = this.props.profile;

      return(
        <div style={this.subViewStyle()}>
            {this.gap(this.bs.height * 0.04)}

            {this.subTitle(['Photo','照片','照片'])}
            {this.sep()}
            {this.gap(this.bs.height * 0.02)}
            <Image app={this.app} filename={profile.icon} type={'profileIcon'} size={this.bs.height * 0.35}/>
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Real name','真實姓名','真实姓名'])}
            {this.sep()}
            {this.textDisplay(profile.name, ['100%',''], '125%', 'center', null, 'name')}
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Self introduction','自我介紹','自我介绍'])}
            {this.sep()}
            {profile.description.split('\n').map(desc=>{return this.textDisplay(desc, ['100%',''], '125%', 'center', null, 'desc')})}
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Total submitted cards','卡片總數','卡片总数'])}
            {this.sep()}
            {this.textDisplay(profile.cardCount, ['50%', ''], '150%', 'center', null, 'cardCount')}
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Total featured cards','精選卡片總數','精选卡片总数'])}
            {this.sep()}
            {this.textDisplay(profile.featuredCount, ['50%', ''], '150%', 'center', null, 'featuredCount')}
            {this.gap(this.bs.height * 0.06)}
        </div>
      )
    }


}

export default Profile;
