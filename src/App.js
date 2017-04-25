import React from "react";
import MeetingList from "./MeetingList";

import api from "./MeetingRestClient";


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
        return <div>Hello</div>
    }
}

export default App;