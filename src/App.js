import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import {actions} from './Actions'

import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Home from './Pages/Home/home';




const App = ({disp, reduxstate}) => {

  const [loggedIn,setLoggedin] = useState(false);
  const [init,setInit] = useState(false)

  useEffect(()=>{
    disp(actions.auth.trigger(true))
    if(reduxstate){
    setLoggedin(reduxstate.auth);
    }
  })

  function tryingthis(){
    setLoggedin(reduxstate.auth)
  }

  return(
  <Router>
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Home/> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {loggedIn ? <Redirect to="/"/> : <Login sending={tryingthis}/>}
      </Route>
      <Route exact path="/register" component={Register} />
    </Switch>
  </Router>
  )
};


const mapDispatchToProps = dispatch => ({
  disp: something => dispatch(something)
})

const mapStateToProps = state => ({
  reduxstate:state
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
