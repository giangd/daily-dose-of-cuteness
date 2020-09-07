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

const NavButton = styled.button`
    position: relative;
    width: 50px;
    height: 50px;
    background-color: Transparent;
    border: none;
    margin-left: auto;
    margin-right: auto;
    &:active {
        outline: 0;
    }
    &:focus {
        outline: 0;
    }
    &:hover {
        outline: 0;
    }
`;

const HomeIcon = styled(BsHouseDoorFill)`
    width: 40px;
    height: auto;
    stroke: grey;
    fill: grey;
`;
const HomeHoveredIcon = styled(BsHouseDoorFill)`
    width: 40px;
    height: auto;
    stroke: red;
    fill: red;
`;

const HeartIcon = styled(BsHeartFill)`
    width: 40px;
    height: auto;
    stroke: grey;
    fill: grey;
`;
const HeartHoveredIcon = styled(BsHeartFill)`
    width: 40px;
    height: auto;
    stroke: red;
    fill: red;
`;

export default function (props) {
    // console.log(props);
    return (
        <div
            className="navBar"
            style={{
                position: "fixed",
                backgroundColor: "darkBlue",
                height: "100vh",
                width: "100px",
                left: "0px",
            }}
        >
            <Container>
                <Row className="block-center" style={{ height: "100vh" }}>
                    <Col
                        style={{
                            textAlign: "center",
                            border: "1px solid",
                        }}
                    >
                        <NavButton
                            onMouseEnter={props.handleMouseEnterHome}
                            onMouseLeave={props.handleMouseLeaveHome}
                            onClick={props.handleClickHome}
                        >
                            {props.isHomeHovered ? (
                                <HomeHoveredIcon />
                            ) : (
                                <HomeIcon />
                            )}
                        </NavButton>
                        <NavButton
                            onMouseEnter={props.handleMouseEnterHeart}
                            onMouseLeave={props.handleMouseLeaveHeart}
                            onClick={props.handleClickHeart}
                        >
                            {props.isHeartHovered ? (
                                <HeartHoveredIcon />
                            ) : (
                                <HeartIcon />
                            )}
                        </NavButton>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
