import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import tick from './tick.js';
import * as serviceWorker from './serviceWorker';

setInterval(() => {
  ReactDOM.render(tick(), document.getElementById('root'));
}, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
