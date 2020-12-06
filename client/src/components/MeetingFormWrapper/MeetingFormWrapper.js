import React, {useContext, useState} from "react";
import MeetingForm from "../MeetingForm/MeetingForm";
import {UserDetailsContext} from "../../contexts/UserDetailsContext";
import {onInputChange} from "../../handlers/inputHandlers";
import ApiService from "../../services/Api/ApiService";

const MeetingFormWrapper = ({client, setShow, showSuccessAlert, showErrorAlert}) => {
    const {id: userId} = useContext(UserDetailsContext)

    const [meeting, setMeeting] = useState({
        client: {
            id: client.id,
            shortName: client.shortName
        },
        user: {
            id: userId
        },
        date: '',
        title: '',
    })

    const onSubmit = (e) => {
        e.preventDefault()
        ApiService.saveMeeting(meeting)
            .then(() => {
                setShow(false)
                showErrorAlert(false)
                showSuccessAlert(true)
            })
            .catch((e) => {
                console.error(e)
                showSuccessAlert(false)
                showErrorAlert({hasError: true})
            })
    }

    return (
        <MeetingForm meeting={meeting}
                     onSubmit={onSubmit}
                     onChange={({target}) => setMeeting(onInputChange(target, meeting))}/>
    )
}

MeetingFormWrapper.defaultProps = {
    showSuccessAlert: () => {
    },
    showErrorAlert: () => {
    }
}

export default MeetingFormWrapper