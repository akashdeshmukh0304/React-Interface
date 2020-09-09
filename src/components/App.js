import React, { Component } from "react";
import "../css/App.css";
import AddAppointments from "./AddAppointments";
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";

import { without, findIndex } from "lodash";

class App extends Component {
    constructor() {
        super();
        this.state = {
            myAppointments: [],
            lastIndex: 0,
            formDisplay: false,
            orderBy: "aptDate",
            orderDir: "asc",
            queryText: ""        
        };
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.searchApts = this.searchApts.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    deleteAppointment(apt) {
        let tempApts = this.state.myAppointments;
        tempApts = without(tempApts, apt);

        this.setState({
            myAppointments: tempApts,
        });
    }

    changeOrder(orderBy, orderDir) {
        this.setState({
            orderBy,
            orderDir
        })
    }

    addAppointment(apt) {
        let tempApts = this.state.myAppointments;
        apt.aptId = this.state.lastIndex;
        tempApts.unshift(apt);
        this.setState({
            appointments: tempApts,
            lastIndex: this.state.lastIndex+1
        })
    }

    toggleForm() {
        this.setState({
            formDisplay: !this.state.formDisplay,
        });
    }

    componentDidMount() {
        fetch("./data.json")
        .then((response) => response.json())
        .then((result) => {
            const apts = result.map((item) => {
                item.aptId = this.state.lastIndex;
                this.setState({
                    lastIndex: this.state.lastIndex + 1,
                });
                return item;
            });
            this.setState({
                myAppointments: apts,
            });
        });
    }

    searchApts(e) {
        const value = e.target.value;
        this.setState({
            queryText: value
        })
    }

    updateInfo(name, value, id) {
        let tempApts = this.state.myAppointments;
        const aptIndex = findIndex(this.state.myAppointments, {
            aptId: id
        })
        tempApts[aptIndex][name] = value;
        this.setState({
            myAppointments: tempApts
        })
    }

    render() {

        let order;
        let filteredApts = this.state.myAppointments;
        if (this.state.orderDir === "asc") {
            order = 1;
        } else {
            order = -1;
        }

        filteredApts = filteredApts.sort((a, b) => {
            if (a[this.state.orderBy].toLowerCase() < 
                b[this.state.orderBy].toLowerCase()
            ) {
                return -1 * order;
            }
            return 1 * order;
        }).filter(eachItem => {
            return (
                eachItem['petName']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase()) ||

                eachItem['ownerName']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase()) ||

                eachItem['aptNotes']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase())
            );
        })

        return (
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                                <AddAppointments
                                    formDisplay={this.state.formDisplay}
                                    toggleForm={this.toggleForm}
                                    addAppointment={this.addAppointment}
                                />
                                <SearchAppointments 
                                    orderBy={this.state.orderBy}
                                    orderDir={this.state.orderDir}
                                    changeOrder={this.changeOrder}
                                    searchApts={this.searchApts}
                                />
                                <ListAppointments
                                    appointments={filteredApts}
                                    deleteAppointment={this.deleteAppointment}
                                    updateInfo={this.updateInfo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
