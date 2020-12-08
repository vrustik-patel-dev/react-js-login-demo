import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { Spin } from 'antd';

import { actions } from './Actions';

import { useAuth0 } from "@auth0/auth0-react";

import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Home from './Pages/Home/home';
import NoMatchPage from './Pages/NotFound';


const App = ({ reduxstate, disp }) => {

  const [loggedIn,setLoggedin] = useState();
  const [justchanging,setJustchanging] = useState(0);

  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(()=>{
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
  console.log("Loading :-",isLoading);
  console.log("Auth :",isAuthenticated);
  console.log("Redux :",reduxstate);
  if(isLoading){
    return <Spin />
  }

  if(!isLoading){
    if(justchanging===0){
      disp(actions.auth.fulfill());
      setJustchanging(2);
    }
  }

  return(
  <Router>
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Home callforlogin={callforlogin} data={reduxstate}/> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {isAuthenticated ? <Redirect to="/"/> : <Login callforlogin={callforlogin} data={reduxstate}/>}
      </Route>
      <Route exact path="/register">
        {isAuthenticated ? <Redirect to="/"/> : <Register callforlogin={callforlogin}/>}
      </Route>
      <Route component={NoMatchPage} />
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
