import React from 'react';
import ReactDOM from 'react-dom';
// import * as Sentry from '@sentry/browser';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './static/app.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// Sentry.init({ dsn: 'https://92b743637f8f47abbfbae99a1326d9a0@sentry.io/1289601' });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
