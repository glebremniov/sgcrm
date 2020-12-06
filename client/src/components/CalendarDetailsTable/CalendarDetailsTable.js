import React, {useContext} from "react";
import "./CalendarDetailsTable.css";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {formatDate} from "../../utils/utils";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const CalendarDetailsTable = ({data}) => {

    const PathService = useContext(PathServiceContext)

    const transformedData = (data) => data.map(({id, date, client, title}, i) => (
        <tr key={id}>
            <td>{i + 1}</td>
            <td>{formatDate(date)}</td>
            <td>
                <Link to={PathService.buildPathToClient(client.id)}>{client.shortName}</Link>
            </td>
            <td>{title}</td>
        </tr>
    ))

    return (
        <div className="calendar-details-table">
            <Table variant="secondary">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Дата</th>
                        <th>Клиент</th>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transformedData(data)
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default CalendarDetailsTable