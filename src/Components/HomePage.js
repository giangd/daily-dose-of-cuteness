/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
const Wrapper = styled.div`
    h1 {
        margin-top: 20px;
    }
    p {
        margin-top: 10px;
        margin-bottom: 30px;
    }
`;

export default function (props) {
    return (
        <Wrapper>
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
        </Wrapper>
    );
}
