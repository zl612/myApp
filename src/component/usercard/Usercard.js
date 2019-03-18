import React from 'react';
import { withRouter } from 'react-router-dom';
import {Card, WhiteSpace,WingBlank} from 'antd-mobile';
import PropTypes from 'prop-types';

const Header = Card.Header
const Body = Card.Body


class Usercard extends React.Component{

  componentDidMount() {

  }
  toChart = (v) => {
    console.log('v: ', v);
    this.props.history.push('/chat/'+v._id)
  }
  render() {
    console.log('this.Boss', this.props);
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userlist.map((v, index) => (
         v.avatar ? 
            <Card 
              key={v._id}
              onClick= {()=>this.toChart(v)}
              style={{ zIndex: 100 }}
            >
              <Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Body>
                {v.type == 'boss' ? <div>公司: {v.company}</div> : null }
                {v.desc.split('\n').map((d, i) => ( 
                  <div key={d}>{d}</div>
                ))}
                {v.type==='boss' ? <div>薪资:{v.money}</div> : null }
              </Body>
            </Card> : null
        ))

        }

      </WingBlank>
    )
  }
}

Usercard.propTypes = {
  userlist: PropTypes.array.isRequired
}

export default withRouter(Usercard);



