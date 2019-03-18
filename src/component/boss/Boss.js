import React from 'react'
import {connect} from 'react-redux'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/Usercard'

class Boss extends React.Component{
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    // console.log('this.Boss', this.props);
    const { userlist } = this.props;
    return (
      userlist ?  <UserCard userlist={userlist} /> : null
    )
  }
}
const mapStateToProps = state => {
  return state.chatuser
}
const mapDispatchToProps = dispatch => {
  return {getUserList: data => dispatch(getUserList(data))}
}

export default connect(mapStateToProps, mapDispatchToProps)(Boss);


