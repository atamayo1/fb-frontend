import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from "react-apollo-hooks";
import {BrowserRouter as Router} from "react-router-dom";
import client from './graphql';
import Routes from './Routes';

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <Routes/>
        </Router>
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
