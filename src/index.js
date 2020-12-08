import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import store from './Store/store';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

console.log(domain,clientId);

ReactDOM.render(
  <>
    <Provider store={store} >
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}>
          <App />
      </Auth0Provider>
    </Provider>
  </>,
  document.getElementById('root')
);
