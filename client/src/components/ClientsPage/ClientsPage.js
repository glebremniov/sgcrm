import React, {useEffect, useState} from "react";
import "./ClientsPage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import ClientCard from "../ClientCard/ClientCard";
import Loader from "../Loader/Loader";
import RowDataTransformer from "../RowDataContainer/RowDataTransformer";

const ClientsPage = (props) => {
    const {
        title,
        getData,
        filterData
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
        return <Loader/>
    }

    if (hasError) {
        return "Error!"
    }

    return (
        <DefaultPage>
            <div className="clients-page">
                <div className="title">
                    <h2>{title}</h2>
                </div>

                <RowDataTransformer dataArr={filterData(data)} CardComponent={ClientCard}/>

            </div>
        </DefaultPage>
    )
}

ClientsPage.propTypes = {}

ClientsPage.defaultProps = {
    title: 'Клиенты',
    getData: () => {
    },
    filterData: (data) => data
}

export default ClientsPage


