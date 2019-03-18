import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile';
import JsCookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/user.redux';

const Item = List.Item
const Brief = Item.Brief

class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout()  {
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        JsCookies.remove('userid');
        this.props.logoutSubmit()
      }}
    ] )
  }

  render() {
    // console.log('aaaaaaaaaa', this.props);
    const { user, type, avatar, desc, title, redirectTo, company, money } = this.props;
    return this.props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${avatar}.png`)} alt="" />}
          title={user}
          message={type === 'boss' ? company : null}
        />
        <List renderFooter={() => '简介'}>
          <Item multipleLine>
            {/* {title} */}
            {desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{money?<Brief>薪资:{money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button style={{ zIndex: 100}} onClick={this.logout} type="primary">退出登录</Button>
        </List>
      </div>
    ) : <Redirect to={redirectTo} />
  }
}

const mapStateToProps = state => {
  return state.user
}
const mapDispatchToProps = dispatch => {
  return { logoutSubmit: () => dispatch(logoutSubmit()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

