import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import './config';
import registerServiceWorker from './registerServiceWorker';

import 'antd-mobile/dist/antd-mobile.css';

import AuthRoute from './component/authroute/AuthRoute';
import Dashboard from './component/dashboard/Dashboard';
import Chat from './component/Chat';
import Login from './container/login/Login';
import Register from './container/register/Register';
import BossInfo from './container/bossinfo/BossInfo';
import GeniusInfo from './container/geniusinfo/Geniusinfo'
import reducers from './reducer';

const logger = createLogger();

const store = createStore(reducers,
  compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension? window.devToolsExtension():f=>f 
  )
)

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/geniusinfo' component={GeniusInfo} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/chat/:id' component={Chat} />
          <Route component={Dashboard} />
        </Switch>  
      </div>
    </BrowserRouter>
  </Provider>),
document.getElementById('root'));
registerServiceWorker();


/*  路由笔记
上面的exact表示绝对匹配/index,如果不注明exact,则/index还会匹配/index/new等等

*/