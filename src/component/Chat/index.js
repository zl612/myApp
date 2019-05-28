import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Badge, InputItem, NavBar } from 'antd-mobile';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

import io from 'socket.io-client';
const socket = io('ws://localhost:3021');

@connect(
  state=> state,
  {getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: [],
    }
  }

  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
  }
  sendMsg = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.id;
    this.props.sendMsg({from, to, msg: this.state.text})
    this.setState({
      text: '',
    })
  }

  render () {
     console.log('this.pro222', this.props);
     const { text, msg } = this.state;
     const id = this.props.match.params.id
    return (
      <div className="chat_page">
      <NavBar mode="dark">
        {id}
       </NavBar>

        {this.props.chat.chatmsg.map((item, index) => {
          return item.from ==  id ? (
            <p key={item._id}>对方发来的：{item.content}</p>
          ) : (<p key={item._id}>我发出的的：{item.content}</p>)
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              value={text}
              placeholder='请输入'
              onChange={ v=> {
                this.setState({
                  text: v,
                })      
              }}
              extra={
                <span onClick={() =>this.sendMsg()}>发送</span>
              }
            />
          </List> 
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch){
  return {
    getMsgList: getMsgList,
    // actions: bindActionCreators({ getMsgList }),
  }
}

export default Chat;
// export default connect(mapStateToProps, mapDispatchToProps)(Chat);
