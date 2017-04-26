import React from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import update from "react-addons-update";
import api from "../../MeetingRestClient";
import PropTypes from "prop-types";
import "react-datetime/css/react-datetime.css";
import moment from 'moment-js'
import {Link} from "react-router-dom";

import DateTime from "react-datetime";


class MeetingCreateForm extends React.Component {

    render = () => {
        let userSelects = this.props.users.map((user, index) => {
            return <option key={user.id} value={index}>{user.username}</option>
        });
        let roomSelects = this.props.rooms.map((room, index) => {
            return <option key={room.id} value={index}>
                {`${room.id}: ${room.officeHoursBegin} - ${room.officeHoursEnd}`}
            </option>
        });
        return <form onSubmit={event => {
            event.preventDefault();
            this.props.handleSubmit()
        }}>
            <FormGroup>
                <ControlLabel>Employer</ControlLabel>
                <FormControl componentClass="select" disabled={this.props.users.length === 0}
                             onChange={event => this.props.selectUser(event.target.value)}>
                    {userSelects}
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Room №</ControlLabel>
                <FormControl componentClass="select" disabled={this.props.rooms.length === 0}
                             onChange={event => this.props.selectRoom(event.target.value)}>
                    {roomSelects}
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Begin</ControlLabel>
                <DateTime
                    type="datetime"
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                    value={this.props.startTime}
                    onChange={moment => this.props.changeTime(moment)}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Duration (Minutes)</ControlLabel>
                <FormControl
                    value={this.props.startTime}
                    onChange={event => this.props.changeDuration(event.target.value)}/>
            </FormGroup>
            <FormControl type="submit" className="btn btn-default"/>
        </form>
    }
}

MeetingCreateForm.propTypes = {
    users: PropTypes.array,
    rooms: PropTypes.array,
    selectUser: PropTypes.func.isRequired,
    selectRoom: PropTypes.func.isRequired,
    changeTime: PropTypes.func.isRequired,
    changeDuration: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

MeetingCreateForm.defaultProps = {
    users: [],
    rooms: []
};

export default class MeetingCreateComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            meeting: {}
        };
    };

    componentDidMount = () => {
        api.user.get()
            .then(data => this.setState(update(this.state, {
                users: {$set: data},
                meeting: {
                    user: {$set: data[0]}
                }
            })))
        api.room.get()
            .then(data => this.setState(update(this.state, {
                rooms: {$set: data},
                meeting: {
                    room: {$set: data[0]}
                }
            })))
    };

    handleSubmit = () => {
        api.meeting.post({
            user: this.state.meeting.user,
            room: this.state.meeting.room,
            meetingDateBegin: this.state.meeting.meetingDateBegin.format('YYYY-MM-DD HH:mm'),
            meetingDateEnd: this.state.meeting.meetingDateBegin.clone()
                .add(this.state.meeting.duration, 'm').format('YYYY-MM-DD HH:mm'),
            submitDate: moment().format('YYYY-MM-DD HH:mm:ss')
        })
            .then(console.log, console.log)
    };

    selectUser = index => {
        this.setState(update(this.state, {
            meeting: {
                user: {$set: this.state.users[index]}
            }
        }))
    };

    selectRoom = index => {
        this.setState(update(this.state, {
            meeting: {
                room: {$set: this.state.rooms[index]}
            }
        }))
    };

    changeMeetingDate = date => {
        this.setState(update(this.state, {
            meeting: {
                meetingDateBegin: {$set: date.clone()},
                meetingDateEnd: {$set: date.clone().add(this.state.meeting.duration, 'm')}
            }
        }))
    };

    changeDuration = duration => {
        this.setState(update(this.state, {
            meeting: {
                duration: {$set: duration},
                meetingDateEnd: {
                    $set: this.state.meeting.meetingDateBegin
                        .clone()
                        .add(duration, 'm')
                }
            }
        }));
    };

    render = () =>
    <div><MeetingCreateForm
        users={this.state.users}
        rooms={this.state.rooms}
        selectUser={this.selectUser.bind(this)}
        selectRoom={this.selectRoom.bind(this)}
        changeTime={this.changeMeetingDate.bind(this)}
        changeDuration={this.changeDuration.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}/>
        <Link to="/meeting" className="float-button back"></Link>
    </div>


}