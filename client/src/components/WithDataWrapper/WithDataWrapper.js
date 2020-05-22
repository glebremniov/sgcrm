import React, {useEffect, useState} from "react";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";

const WithDataWrapper = (props) => {

    const {getData, filterData, Component} = props

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

