import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";
import Error from "../Error/Error";

const WithDataWrapper = (props) => {

    const {getData, filterData, Component} = props

    const [data, setData] = useState(null)
    const [hasLoaded, setLoaded] = useState(false)
    const [hasError, setError] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        const onSuccess = (data) => {
            setLoaded(true)
            setError(false)
            setData(data)
        }

        const onError = (error) => {
            console.error(error)
            setLoaded(true)
            setError(true)
        }

        if (id) {
            getData(id)
                .then(onSuccess)
                .catch(onError)
        } else {
            getData()
                .then(onSuccess)
                .catch(onError)
        }


    }, [getData, id])

    if (!hasLoaded || !data) {
        return <Loader/>
    }

    if (hasError) {
        return <Error/>
    }

    return (
        <Component {...props} data={filterData(data)}/>
    )
}

WithDataWrapper.propTypes = {
    getData: PropTypes.func,
    filterData: PropTypes.func,
    Component: PropTypes.elementType
}

WithDataWrapper.defaultProps = {
    filterData: (data) => data
}

export default WithDataWrapper;

