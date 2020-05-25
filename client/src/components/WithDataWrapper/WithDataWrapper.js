import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";
import AlertDanger from "../AlertDanger/AlertDanger";

const WithDataWrapper = (props) => {
    const {getData, filterData, Component} = props
    
    const {id} = useParams()

    const [data, setData] = useState(null)
    const [hasLoaded, setLoaded] = useState(false)
    const [hasError, setError] = useState(false)

    const getDataWrapper = useCallback(() => {
        const onSuccess = (data) => {
            setError(false)
            setData(data)
            setLoaded(true)
        }
        const onError = (error) => {
            console.error(error)
            setError(true)
            setLoaded(true)
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

    const reload = (newData) => {
        if (newData) {
            setData(newData)
        } else {
            getDataWrapper()
        }
    }

    useEffect(() => {
        getDataWrapper()
    }, [getDataWrapper])

    if (!hasLoaded) {
        return <Loader/>
    }

    if (hasError) {
        return <AlertDanger/>
    }

    return (
        <Component {...props}
                   reload={reload}
                   data={filterData(data)}/>
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

