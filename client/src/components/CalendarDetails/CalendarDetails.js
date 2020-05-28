import React from "react";
import "./CalendarDetails.css";
import Loader from "../Loader/Loader";
import {Alert} from "react-bootstrap";
import CalendarDetailsTable from "../CalendarDetailsTable/CalendarDetailsTable";

const CalendarDetails = ({data}) => {
    if (!data) {
        return <Loader/>
    }

    if (data.length === 0) {
        return (
            <Alert variant="light">
                <Alert.Heading>В Вашем календаре события не найдены.</Alert.Heading>
            </Alert>
        )
    }

    return (
        <div className="calendar-details">
            <CalendarDetailsTable data={data}/>
        </div>
    )
}

export default CalendarDetails