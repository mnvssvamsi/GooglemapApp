import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Map from './components/Map'
import Auth from './containers/Auth/Auth'
import Welcome from './components/Welcome/Welcome'
import Logout from './components/Navbar/Logout/Logout'
import * as actions from './Store/actions/index'
import { connect } from 'react-redux'


class App extends Component {


  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Auth} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/names' exact component={Welcome} />
          <Route path='/names/maps' component={Map} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={Auth} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <div>
        {routes}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
