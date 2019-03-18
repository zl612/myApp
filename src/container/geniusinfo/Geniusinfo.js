import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

class Geniusinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
    }
  }
  onChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  render() {
        // console.log('this.Geniusinfo', this.props);
        // console.log('this.Geniusinfo', this.state);
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
        <NavBar mode="dark">牛人完善页</NavBar>
        <AvatarSelector
          selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
        />
        <InputItem onChange={v => this.onChange('title', v)}>
        求职岗位
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title="个人需求"
        />
        <Button
          onClick={() => {
            this.props.update(this.state)
          }}
          type="primary"
        >保存</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}
const mapDispatchToProps = dispatch => {
  return { update: data => dispatch(update(data)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geniusinfo);





