import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Home from './Pages/Home/home';


const App = ({disp, reduxstate}) => {

  const [loggedIn,setLoggedin] = useState();

  useEffect(()=>{
    console.log(reduxstate);
    if(reduxstate){
      if(loggedIn!==reduxstate.auth){
        setLoggedin(reduxstate.auth);
      }
    }
  },[reduxstate,loggedIn])

  function callforlogin(dispfromdata){
    disp(dispfromdata);
    if(reduxstate){
      if(loggedIn!==reduxstate.auth){
        setLoggedin(reduxstate.auth);
      }
    }
  }

  return(
  <Router>
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Home callforlogin={callforlogin} data={reduxstate}/> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {loggedIn ? <Redirect to="/"/> : <Login callforlogin={callforlogin} data={reduxstate}/>}
      </Route>
      <Route exact path="/register">
        <Register callforlogin={callforlogin}/>
      </Route>
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
