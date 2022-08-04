import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./store";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// CSS Files
// Bootstrap CSS
import './assets/plugins/bootstrap/css/bootstrap.min.css';

import './assets/plugins/fontawesome/css/fontawesome.min.css';
import './assets/plugins/fontawesome/css/all.min.css';

import './assets/plugins/simple-calendar/simple-calendar.css';
import './assets/plugins/simple-calendar/jquery.simple-calendar.js';


// Custom CSS
import './assets/css/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
