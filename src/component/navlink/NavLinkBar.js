import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class NavLinkBar extends React.Component {

  render() {
    const navList = this.props.data.filter(v=> !v.hide);
    const { pathname } = this.props.location;
    // console.log('this.NavLinkBar', this.props);
    // console.log('this.navList', navList);

    return(
      <TabBar>
        {
          navList.map((v, key) => (
            <TabBar.Item 
              key={v.path}
              title={v.title}
              icon={{uri: require(`./img/${v.icon}.png`)}}
              selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
              selected={pathname===v.path}
              onPress={() => {
                this.props.history.push(v.path)
              }}
            /> 
          ))
        }
      </TabBar>
    )
  }
}

NavLinkBar.propTypes = {
  data: PropTypes.array.isRequired
}

export default withRouter(NavLinkBar);
