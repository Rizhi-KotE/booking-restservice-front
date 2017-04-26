import React from "react";
import api from "../../MeetingRestClient";
import {Pagination} from "react-bootstrap";
import update from "react-addons-update";
import {Link} from "react-router-dom";
import MeetingFiltersComponent from "../filter/MeetingFiltersComponent";
import MeetingListContent from "./MeetingsList";

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
            },
            sort: {
                sortTuple: {}
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

    ordersMap = {
        undefined: 'ASC',
        'ASC': 'DESC',
        'DESC': undefined
    };

    changeSort = sort => {
        let order = this.ordersMap[this.state.sort.sortTuple[sort]];
        let sortTuple = {};
        sortTuple[sort] = order;
        let newState = update(this.state, {
            filter: {
                sort: {$set: sort},
                order: {$set: order}
            },
            sort: {$set: {sortTuple}}
        });
        if (!order) {
            delete newState.filter.order
        }
        this.setState(newState);
        this.changeFilter(newState.filter);
    };

    render = () => <div>
        <MeetingFiltersComponent
            filter={this.state.filter}
            onChange={this.changeFilter}/>
        <MeetingListContent meetings={this.state.meetings}
                            onChangeSortColumn={this.changeSort.bind(this)}
                            sortTuple={this.state.sort.sortTuple}
        />
        <MeetingPagination page={this.state.page}
                           handleSelect={this.changePage.bind(this)}
                           sortTuple={this.state.sort.sortTuple}/>
        <Link to="/meeting/new" className="float-button">+</Link>
    </div>
}