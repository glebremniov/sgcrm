import React, {useEffect, useState} from "react";
import "./ClientsPage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import {Table} from "react-bootstrap";

const ClientsPage = (props) => {

    const {
        title,
        getData
    } = props

    const [data, setData] = useState([])
    const [hasLoaded, setLoaded] = useState(false)
    const [hasError, setError] = useState(false)

    useEffect(() => {
        getData()
            .then(data => {
                setLoaded(true)
                setError(false)
                setData(data)
            })
            .catch(e => {
                console.error(e)
                setLoaded(true)
                setError(true)
            })
    }, [getData])

    if (!hasLoaded) {
        return "Loading"
    }

    if (hasError) {
        return "Error!"
    }


    console.log(data)

    return (
        <DefaultPage>
            <div className="clients-page">
                <div className="title">
                    <h2>{title}</h2>
                </div>

                <ClientsTable data={data}/>

            </div>
        </DefaultPage>
    )
}

ClientsPage.propTypes = {}

ClientsPage.defaultProps = {
    title: 'Клиенты',
    getData: () => {
    }
}

export default ClientsPage

const ClientsTable = ({data = []}) => {

    const getTableHeader = () => {
        if (data.length > 0) {

            const keyToLabel = (key) => {
                const keyToLabelMapping = {
                    id: '#',
                    name: 'Название'
                }

                if (keyToLabelMapping.hasOwnProperty(key)) {
                    return keyToLabelMapping[key]
                } else {
                    console.error('Couldn\'t find a label for key:', key)
                    return key
                }
            }

            const headerData = Object.keys(data[0]).map(keyToLabel)

            return (
                <thead>
                    <tr>
                        {
                            headerData.map((it, i) => (
                                <th key={`th-${i}`}>
                                    {
                                        it
                                    }
                                </th>
                            ))
                        }
                    </tr>
                </thead>
            )
        }

        return "No data"
    }

    return (
        <div className="clients-table">
            <Table striped bordered hover responsive>
                {
                    getTableHeader()
                }
            </Table>
        </div>
    )
}
