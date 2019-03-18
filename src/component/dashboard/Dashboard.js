import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom';
import NavLinkBar from '../navlink/NavLinkBar';

import Boss from '../boss/Boss'
import Genius from '../genius/Genius'
import User from '../user/User'
import Msg from '../msg/Msg'


class Dashboard extends React.Component{


  render() {
    console.log('this.prosp2222222', this.props);
    const {pathname} = this.props.location;
    if ('/' == pathname) {return false};
    const user = this.props.user
    const navList = [
        {
        path: '/genius',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },{
        path:'/boss',
        text:'boss',
        icon:'job',
        title:'BOSS列表',
        component:Genius,
        hide:user.type=='boss'
      },{
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg
      }, {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
      }
    ];
    return (
      <div>
        <NavBar className="fixd-header" mode="dard">{navList.find(v=> v.path ===pathname).title}</NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v=> (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}
const mapStateToProps = state => (
  state.user
)
// const mapDispatchToProps = dispatch => {
//   return 
// }

export default connect(mapStateToProps)(Dashboard);
