import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'animate.css/animate.min.css';
import './styles/global.scss';
import { BrowserRouter as Router } from "react-router-dom";

const Root = () => (
  <Router>
      <App />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));