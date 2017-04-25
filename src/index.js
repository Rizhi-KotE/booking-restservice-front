import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {BrowserRouter, Route, Link} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import MeetingsComponent from "./MeetingList";
import MeetingCreateForm from "./MeetingCreateForm";


const history = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter history={history}>
        <div className="container">
            <Route exact path='/' component={MeetingsComponent}/>
            <Route exact path='/meeting' component={MeetingsComponent}/>
            <Route exact path='/meeting/new' component={MeetingCreateForm}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
