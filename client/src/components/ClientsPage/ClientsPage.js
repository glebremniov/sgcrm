import React, {useContext} from "react";
import "./ClientsPage.css";
import DefaultPage from "../DefaultPage/DefaultPage";
import ClientCard from "../ClientCard/ClientCard";
import RowDataTransformer from "../RowDataContainer/RowDataTransformer";
import PropTypes from "prop-types";
import WithDataWrapper from "../WithDataWrapper/WithDataWrapper";
import {PathServiceContext} from "../../contexts/PathServiceContext";
import {faLongArrowAltDown, faLongArrowAltUp, faWallet} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Col, Row} from "react-bootstrap";

const ClientsPage = (props) => {
    const {
        title,
        filterData,
        getData,
    } = props

    const PathService = useContext(PathServiceContext)

    return (
        <DefaultPage title={title}
                     icon={faWallet}
                     breadcrumbItems={[
                         PathService.breadcrumbs().home(),
                         PathService.breadcrumbs().clients(),
                     ]}>
            <div className="clients-page">

                <Row>
                    <Col className="text-right">
                        <Button variant={"outline-secondary"}
                              className="mr-2">
                            Сортировать по имени <FontAwesomeIcon icon={faLongArrowAltDown}/>
                            <FontAwesomeIcon icon={faLongArrowAltUp}/>
                        </Button>
                        <Link to={PathService.newClient()}
                              className="btn btn-primary">
                            Новый клиент
                        </Link>
                    </Col>
                </Row>

                <WithDataWrapper
                    getData={getData}
                    filterData={filterData}
                    Component={RowDataTransformer}
                    CardComponent={ClientCard}
                />

            </div>
        </DefaultPage>
    )
}

ClientsPage.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
}

ClientsPage.defaultProps = {
    title: '',
    data: [],
}

export default ClientsPage


