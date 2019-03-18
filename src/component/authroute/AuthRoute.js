import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';


class AuthRoute extends React.Component{
  // constructor(props) {
  //   super(props);
  //   this.state ={
  //   }
  // }
  componentWillMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.includes(pathname)) {
      return null;
    }
    // 获取用户信息
    axios.get('/user/info')
      .then(res => {
        console.log('res: ', res);
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 有登录信息
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('/login')
          }
        }
      })
      // 权限判断 是否登录
      // 现在的url地址 login是不需要跳转

      // 用户的 type 身份是boss还是牛人
      // 用户是否完善信息(选择头像  个人简介)
  }
  render() {
    return null
  }
}

const mapStateToProps = state => {
  return state.user
}

const mapDispatchToProps = dispatch => {
  return { loadData: data => dispatch(loadData(data))  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));


/* 
withRouter可以用来给组件注入router相关的一些参数
其次withRouter是专门用来处理数据更新问题的。
在使用一些redux的的`connect()`或者mobx的`inject()`的组件中，
如果依赖于路由的更新要重新渲染，会出现路由更新了但是组件没有重新渲染的情况。
这是因为redux和mobx的这些连接方法会修改组件的`shouldComponentUpdate`。
座椅在使用withRouter解决更新问题的时候，一定要保证withRouter在最外层，
比如`withRouter(connect(Component))`

*/