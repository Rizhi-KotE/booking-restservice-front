import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {Route, Router} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import MeetingList from "./MeetingList";
import MeetingCreateForm from "./MeetingCreateForm";


const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path='*' component={MeetingList}/>
            <Route path='meeting' component={MeetingList}/>
            <Route path='meeting/create' component={MeetingCreateForm}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
