import React from "react";
import "./CalendarDetails.css";
import Loader from "../Loader/Loader";

const CalendarDetails = ({data = []}) => {
    if (data.length === 0) {
        return <Loader/>
    }

    return (
        <div className="calendar-details">

        </div>
    )
}

export default CalendarDetails