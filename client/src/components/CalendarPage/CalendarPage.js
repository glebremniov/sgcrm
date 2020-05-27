import React, {useContext} from "react";
import "./CalendarPage.css";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import DefaultPage from "../DefaultPage/DefaultPage";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {UserDetailsContext} from "../../contexts/UserDetailsContext";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import ApiService from "../../services/Api/ApiService";
import CalendarDetails from "../CalendarDetails/CalendarDetails";

const CalendarPage = ({title}) => {
    const PathService = useContext(PathServiceContext)
    const {id: userId} = useContext(UserDetailsContext)

    return (
        <div className="calendar-page">
            <DefaultPage
                title={title}
                icon={faCalendarAlt}
                breadcrumbItems={[
                    PathService.breadcrumbs().home(),
                    PathService.breadcrumbs().calendar()
                ]}>
                <WithDataWrapper
                    getData={() => ApiService.getMeetings(userId)}
                    Component={CalendarDetails}
                />
            </DefaultPage>
        </div>
    )
}

export default CalendarPage