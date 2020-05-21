import React, {useEffect, useState} from "react";
import "./ClientsPage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import ClientCard from "../ClientCard/ClientCard";
import Loader from "../Loader/Loader";

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
        return <Loader/>
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

                <div className="card-wrapper">
                    {
                        data.map(it => <ClientCard data={it}/>)
                    }
                </div>

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


