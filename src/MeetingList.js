import React from "react";
import api from "./MeetingRestClient";
import {ControlLabel, FormControl, FormGroup, Pagination, Table} from "react-bootstrap";
import update from "react-addons-update";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import DateTime from "react-datetime";

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

class MeetingFilterConfig extends React.Component {
    beginTimeChanged = moment => {
        this.props.onChange(update(this.props.filter, {
            beginTime: {$set: moment}
        }))
    };

    endTimeChanged = moment => {
        this.props.onChange(update(this.props.filter, {
            endTime: {$set: moment}
        }))
    };

    employerFilterChange = emp => {
        this.props.onChange(update(this.props.filter, {
            user: {$set: emp}
        }))
    };

    render = () =>
        <div className="filtersConfig">
            <table>
                <tbody>
                <tr>
                    <td className="filter">
                        <div className="exist_part">
                            <span>Time</span>
                            <div className="drop_part ">
                                <FormGroup>
                                    <ControlLabel>Begin</ControlLabel>
                                    <DateTime
                                        type="datetime"
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat="HH:mm"
                                        value={this.props.startTime}
                                        onChange={moment => this.beginTimeChanged(moment)}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>End</ControlLabel>
                                    <DateTime
                                        type="datetime"
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat="HH:mm"
                                        value={this.props.startTime}
                                        onChange={moment => this.endTimeChanged(moment)}/>
                                </FormGroup>
                            </div>
                        </div>
                    </td>
                    <td className="filter">
                        <div className="exist_part">
                            <span>Employer</span>
                            <div className="drop_part ">
                                <form>
                                    <FormGroup>
                                        <ControlLabel>Name pattern</ControlLabel>
                                        <FormControl onChange={pattern => this.employerFilterChange(pattern)}/>
                                    </FormGroup>
                                </form>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

}

MeetingFilterConfig.propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

MeetingFilterConfig.defaultProps = {
    filter: {}
};

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

    changeFilter = filter => {
        let newFilter = update(filter, {
            page: {$set: 1}
        });
        api.meeting.get(newFilter)
            .then(data =>
                this.setState(update(this.state, {
                    meetings: {$set: data.content},
                    page: {$set: data},
                    filter: {$set: newFilter}
                }))
            );
    };

    render = () => <div>
        <MeetingFilterConfig
            filter={this.state.filter}
            onChange={this.changeFilter.bind(this)}/>
        <MeetingListContent meetings={this.state.meetings}/>
        <MeetingPagination page={this.state.page}
                           handleSelect={this.changePage.bind(this)}/>
        <Link to="/meeting/new" className="float-button">+</Link>
    </div>
}