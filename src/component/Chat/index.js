import React from 'react';
import { connect } from 'react-redux';
import { List, Badge, InputItem, } from 'antd-mobile';

import io from 'socket.io-client';
const socket = io('ws://localhost:3021');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: [],
    }
  }

  componentDidMount() {
    const _this = this;
    socket.on('recvmsg', function(data) {
      console.log('recvmsg-data: ', data);
      _this.setState({
        msg: [..._this.state.msg, data.text],
      })
    })
  }
  sendMsg = () => {
    socket.emit('sendmsg', { text: this.state.text })
    this.setState({
      text: '',
    })
  }

  render () {
     console.log('this.pro87878787222', this.props);
     console.log('thisvalue', this.state);
     const { text, msg } = this.state;
    return (
      <div>
        {msg.map((item, index) => {
          return <p key={index}>{item}</p>
          })
        }
     
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
                <span onClick={this.sendMsg}>发送</span>
              }
            />
          </List> 
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Chat);
