import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../usercard/Usercard';

class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    console.log('jiojfaj', this.props);
    return (
      <UserCard userlist={this.props.userlist} />
    )
  }
}

const mapStateToProps = state => {
  return state.chatuser;
}
const mapDispatchToProps = dispatch => {
  return { getUserList: data => dispatch(getUserList(data)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genius);



