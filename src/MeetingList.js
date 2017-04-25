import React from "react";
import api from "./MeetingRestClient";
import {Pagination, Table} from "react-bootstrap";
import update from "react-addons-update";
import {Link} from "react-router-dom";

class MeetingListContent extends React.Component {
    render() {
        let entries = this.props.meetings.map((meeting) =>
            <tr key={meeting.id}>
                <td>{meeting.id}</td>
                <td>{meeting.meetingDateBegin}</td>
                <td>{meeting.meetingDateEnd}</td>
                <td>{meeting.room.id}</td>
                <td>{meeting.user.id}</td>
            </tr>);

        return <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Begin</th>
                <th>End</th>
                <th>Room</th>
                <th>Employer</th>
            </tr>
            </thead>
            <tbody>
            {entries}
            </tbody>
        </Table>
    }
}

class MeetingPagination extends React.Component {
    render() {
        return <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.props.page.totalPages}
            maxButtons={5}
            activePage={this.props.page.number}
            onSelect={this.props.handleSelect}/>
    }
}

export default class MeetingsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            meetings: [],
            page: {},
            filter: {
                page: 1,
                'page-size': 5
            }
        }
    }

    changePage(page) {
        let newFilter = update(this.state.filter, {page: {$set: page}});
        api.meeting.get(newFilter)
            .then(data =>
                this.setState(update(this.state, {
                    meetings: {$set: data.content},
                    page: {$set: data},
                    filter: {$set: newFilter}
                }))
            );
    }

    componentDidMount() {
        this.changePage(1)
    }

    render = () => <div>
        <MeetingListContent meetings={this.state.meetings}/>
        <MeetingPagination page={this.state.page}
                           handleSelect={this.changePage.bind(this)}/>
        <Link to="/meeting/new" className="float-button">+</Link>
    </div>
}