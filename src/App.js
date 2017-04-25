import React from "react";

import api from "./MeetingRestClient";
import {Link} from 'react-router'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            page: {
                content: [],
                size: 10,
                number: 1
            }
        }
    }

    componentDidMount() {
        api.meeting.get()
            .then(data => this.setState({page: data}));
    }

    handleSelect(event) {
        api.meeting.get({
            page: event,
            'page-size': this.state.page.size
        }).then(data => this.setState({page: data}))
    }

    render() {

        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/repos">Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
        );

    }
}

export default App;