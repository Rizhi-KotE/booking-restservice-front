import React from "react";
import {Pagination, Table} from "react-bootstrap";

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

export default class MeetingList extends React.Component {
    render = () => <div>
        <MeetingListContent meetings={this.props.meetings}/>
        <MeetingPagination
            page={this.props.page}
            handleSelect={this.props.handleSelect}/>
    </div>
}