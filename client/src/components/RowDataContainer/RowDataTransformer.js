import React from "react";
import {Col, Row} from "react-bootstrap";

const RowDataTransformer = ({data = [], CardComponent}) => {

    const reshapeDataArr = (data) => {
        let resultArr = [];

        if (Array.isArray(data)) {
            let dataArrCopy = [...data]
            while (dataArrCopy.length) {
                resultArr.push(dataArrCopy.splice(0, 3))
            }
        }

        return resultArr;
    }

    const transformDataArr = (data) => {
        return reshapeDataArr(data).map((row, i) => (
            <Row key={i}>
                {
                    row.map((col, i) => (
                        <Col key={i} lg={4}>
                            <CardComponent key={col.id} {...col}/>
                        </Col>
                    ))
                }
            </Row>
        ))
    };

    return (
        <>{transformDataArr(data)}</>
    )
};

export default RowDataTransformer