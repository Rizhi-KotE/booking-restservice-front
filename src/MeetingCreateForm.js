import React from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import update from "react-addons-update";
import api from "./MeetingRestClient";

export default class MeetingCreateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            meeting: {
                startTime: '1111111'
            },
            users: [],
            rooms: []
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

    handleSubmit = event => {
        event.preventDefault()
        api.meeting.post(this.state.meeting)
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

    changeMeetingDate = event => {

    }

    render = () => {
        let userSelects = this.state.users.map((user, index) => {
            return <option key={user.id} value={index}>{user.username}</option>
        });
        let roomSelects = this.state.rooms.map((room, index) => {
            return <option key={room.id}
                           value={index}>{`${room.id}: ${room.officeHoursBegin} - ${room.officeHoursEnd}`}</option>
        });
        return <form
            onSubmit={this.handleSubmit}>
            <FormGroup>
                <ControlLabel>Employer</ControlLabel>
                <FormControl componentClass="select"
                             onChange={event => this.selectUser(event.target.value)}>
                    {userSelects}
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Room №</ControlLabel>
                <FormControl componentClass="select"
                             onChange={event => this.selectRoom(event.target.value)}>
                    {roomSelects}
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Begin</ControlLabel>
                <FormControl
                    type="date"
                    value={this.state.startTime}
                    onChange={event => this.setState(update(this.state, {
                        startTime: {$set: event.target.value}
                    }))}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Duration (Minutes)</ControlLabel>
                <FormControl
                    value={this.state.startTime}
                    onChange={event => this.setState(update(this.state, {
                        duration: {$set: event.target.value}
                    }))}/>
            </FormGroup>
            <button className="btn btn-default" type="submit">Submit</button>
        </form>
    }
}

var a = {
    "timestamp": "2017-04-25T12:55:28.624+0000",
    "status": 400,
    "error": "Bad Request",
    "exception": "org.springframework.web.bind.MethodArgumentNotValidException",
    "errors": [{
        "codes": ["NotNull.meeting.meetingDateBegin", "NotNull.meetingDateBegin", "NotNull.java.time.LocalDateTime", "NotNull"],
        "arguments": [{
            "codes": ["meeting.meetingDateBegin", "meetingDateBegin"],
            "arguments": null,
            "defaultMessage": "meetingDateBegin",
            "code": "meetingDateBegin"
        }],
        "defaultMessage": "должно быть задано",
        "objectName": "meeting",
        "field": "meetingDateBegin",
        "rejectedValue": null,
        "bindingFailure": false,
        "code": "NotNull"
    }, {
        "codes": ["NotNull.meeting.submitDate", "NotNull.submitDate", "NotNull.java.time.LocalDateTime", "NotNull"],
        "arguments": [{
            "codes": ["meeting.submitDate", "submitDate"],
            "arguments": null,
            "defaultMessage": "submitDate",
            "code": "submitDate"
        }],
        "defaultMessage": "должно быть задано",
        "objectName": "meeting",
        "field": "submitDate",
        "rejectedValue": null,
        "bindingFailure": false,
        "code": "NotNull"
    }, {
        "codes": ["NotNull.meeting.meetingDateEnd", "NotNull.meetingDateEnd", "NotNull.java.time.LocalDateTime", "NotNull"],
        "arguments": [{
            "codes": ["meeting.meetingDateEnd", "meetingDateEnd"],
            "arguments": null,
            "defaultMessage": "meetingDateEnd",
            "code": "meetingDateEnd"
        }],
        "defaultMessage": "должно быть задано",
        "objectName": "meeting",
        "field": "meetingDateEnd",
        "rejectedValue": null,
        "bindingFailure": false,
        "code": "NotNull"
    }],
    "message": "Validation failed for object='meeting'. Error count: 3",
    "path": "/meeting"
}