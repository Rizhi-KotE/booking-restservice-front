import React from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import update from "react-addons-update";
import DateTime from "react-datetime";

import "./styles.css";

export default class MeetingFilterConfig extends React.Component {
    beginTimeChanged = moment => {
        this.props.onChange(update(this.props.filter, {
            'after-time': {$set: moment.format('YYYY-MM-DD HH:mm')}
        }))
    };

    endTimeChanged = moment => {
        this.props.onChange(update(this.props.filter, {
            'before-time': {$set: moment.format('YYYY-MM-DD HH:mm')}
        }))
    };

    employerFilterChange = emp => {
        this.props.onChange(update(this.props.filter, {
            user: {$set: emp}
        }))
    };

    roomFilterChange = roomId => {
        this.props.onChange(update(this.props.filter, {
            room: {$set: roomId}
        }))
    };

    render = () =>
        <div className="filtersConfig collapse navbar-collapse">
            Filters
            <td className="dropdown">
                <span>Time</span>
                <div className="dropdown-content ">
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
                    <FormControl type="date"/>
                </div>
            </td>
            <td className="dropdown">
                <span>Employer</span>
                <div className="dropdown-content ">
                    <form>
                        <FormGroup>
                            <ControlLabel>Name pattern</ControlLabel>
                            <FormControl onChange={event => this.employerFilterChange(event.target.value)}/>
                        </FormGroup>
                    </form>
                </div>
            </td>
            <td className="dropdown">
                <span>Room №</span>
                <div className="dropdown-content ">
                    <form>
                        <FormGroup>
                            <ControlLabel>Room number</ControlLabel>
                            <FormControl onChange={event => this.roomFilterChange(event.target.value)}/>
                        </FormGroup>
                    </form>
                </div>
            </td>
        </
            div
        >
}
