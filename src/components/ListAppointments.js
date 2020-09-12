import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import Moment from "react-moment";

export default class AddAppoitments extends Component {
    render = () => {
        const { appointments, deleteAppointment } = this.props;

        return (
            <div className="appointment-list item-list mb-3">
                {appointments.map((item, i) => (
                    <div className="pet-item col media py-3" key={item.aptId}>
                        <div className="mr-3">
                            <button
                                className="per-delete btn btn-sm btn-danger"
                                onClick={() => deleteAppointment(item)}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span 
                                    className="pet-name"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={
                                        e => this.props.updateInfo("petName", e.target.innerHTML, item.aptId)
                                    }
                                >
                                    {item.petName}
                                </span>
                                <span className="apt-date ml-auto">
									<Moment 
										date={item.aptDate}
                                        parse="YYYY-MM-dd hh:mm"
                                        format="MMM-D h:mma"
                                    />
                                </span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item">Owner: </span>
                                <span
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={
                                        e => this.props.updateInfo("ownerName", e.target.innerHTML, item.aptId)
                                    }
                                >
                                    {item.ownerName}
                                </span>
                            </div>
                            <div 
                                className="apt-notes"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={
                                    e => this.props.updateInfo("aptNotes", e.target.innerHTML, item.aptId)
                                }
                            >
                                {item.aptNotes}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
