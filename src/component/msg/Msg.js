import React from 'react';
import { connect } from 'react-redux';
import { List, Badge, InputItem, } from 'antd-mobile';

import io from 'socket.io-client';

class Msg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  componentDidMount() {
    const socket = io('ws://localhost:3021');
    socket.on('news', function(data) {
      console.log('client-data: ', data);
      socket.emit('wwcc', { my: 'first' })

    })
  }

  render () {
     console.log('this.pro87878787222', this.props);
    return (
      <div className="stick-footer">
        <List>
          <InputItem
            value={this.state.value}
            onClick={ v=> {
              this.setSatate({
                value: v,
              })
            }}
            extra={
              <span>发送</span>
            }
          />
        </List>
      </div>
    )
  }
}

export default connect(state => state)(Msg);
