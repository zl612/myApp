import React from 'react';
import {NavBar,InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: '',
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render () {
    console.log('this.BossInfo', this.props);
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
        <NavBar mode="dark">Boss信息完善页</NavBar>
        <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname
            })
          }}
        />
        <InputItem onChange={v => this.onChange('title', v) }>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v) }>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v) }>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          row={3}
          autoHeight
          title="岗位要求"
        />
        <Button
          type='primary'
          onClick={() => {
            this.props.update(this.state)
          }}
        >保存</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

const mapDispatchToProps = dispatch => {
  return {update: data => dispatch(update(data))}
}

export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);

