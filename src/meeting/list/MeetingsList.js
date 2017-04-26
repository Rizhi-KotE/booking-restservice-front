import React from "react";
import {Table} from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.css";
class TableHeader extends React.Component {
    changeOrder = () => {
        this.props.onChange(this.props.column)
        // if (this.props.order === 'A') this.props.onChange('D');
        // if (this.props.order === 'D') this.props.onChange(null);
        // if (this.props.order === null) this.props.onChange('A');
    };

    render = () => {
        let className = 'meeting-list-header ' + this.props.order || '';
        return <th onClick={this.changeOrder} className={className}>
            {this.props.children}
        </th>
    }
}


TableHeader.propTypes = {
    column: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired
};

export default class MeetingListContent extends React.Component {
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
                <TableHeader column="meetingDateBegin"
                             onChange={this.props.onChangeSortColumn}
                             order={this.props.sortTuple.meetingDateBegin}>Begin</TableHeader>
                <TableHeader column="meetingDateEnd"
                             onChange={this.props.onChangeSortColumn}
                             order={this.props.sortTuple.meetingDateEnd}>End</TableHeader>
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

MeetingListContent.propTypes = {
    sortTuple: PropTypes.object
};

MeetingListContent.defaultProps = {
    sortTuple: {}
};