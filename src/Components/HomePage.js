import React from "react";
import axios from "axios";
import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import cloneDeep from "lodash/cloneDeep";
import { FiExternalLink } from "react-icons/fi";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsHeartFill, BsHouseDoorFill } from "react-icons/bs";

const CustomButton = styled(Button)`
    border-color: ${(props) => props.color} !important;
    /* color: ${(props) => props.color}; */
    background: ${(props) => props.color} !important;
    color: white;

    &:hover {
        color: rgb(230, 230, 230);
    }
    &:active {
        background: ${(props) => props.color} !important;
    }
    &:focus {
        box-shadow: none !important;
    }
`;
export default function (props) {
    return (
        <>
            <Row>
                <Col>
                    <h1 className="display-4 text-center">
                        Daily Dose of Cuteness
                    </h1>
                    <p className="lead text-center">
                        🌈 A few cute pictures a day keeps the sadness away 🤗
                    </p>
                </Col>
            </Row>

            <Row className="text-center">
                <Col></Col>
                <Col xs={3}>
                    <CustomButton
                        value="everything"
                        // variant="outline-primary"
                        color={"#138715"}
                        onClick={props.handleCategoryClick}
                    >
                        EVERYTHING
                    </CustomButton>
                    <CustomButton
                        value="dogs"
                        // variant="outline-primary"
                        color={"#304CC8"}
                        onClick={props.handleCategoryClick}
                    >
                        Dogs
                    </CustomButton>
                    <CustomButton
                        value="cats"
                        // variant="outline-primary"
                        color={"#4E2388"}
                        onClick={props.handleCategoryClick}
                    >
                        Cats
                    </CustomButton>
                    <CustomButton
                        value="reptiles"
                        // variant="outline-primary"
                        color={"#DA9101"}
                        onClick={props.handleCategoryClick}
                    >
                        Reptiles
                    </CustomButton>
                    <CustomButton
                        value="birds"
                        // variant="outline-primary"
                        color={"#CA302F"}
                        onClick={props.handleCategoryClick}
                    >
                        Birds
                    </CustomButton>
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}
