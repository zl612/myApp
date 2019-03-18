import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/user.redux';

import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../component/logo/logo';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
    }
  }

  handleChange = (key, val) => { // 设置
    this.setState({
      [key]: [val]
    })
  }
  handleLogin = () => { // 登录
    this.props.login(this.state);
  }

  register = () =>{ // 注册
    this.props.history.push('/register'); 
  }

  render() {
    console.log('this.', this.props);
    const pathname = this.props.location.pathname;
    const { redirectTo } = this.props;
    return (
      <div>
        {redirectTo && pathname != redirectTo  ? <Redirect to={redirectTo} /> : null }
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null }
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >
            用户</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => this.handleChange('pwd', v)}
              type='password'
            >
            密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}
 
const mapDispatchToProps = dispatch => {
  return {login: data => dispatch(login(data))}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);