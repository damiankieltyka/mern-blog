import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'animate.css/animate.min.css';
import './styles/global.scss';

const Root = () => (
  <App />
);

ReactDOM.render(<Root />, document.getElementById('root'));