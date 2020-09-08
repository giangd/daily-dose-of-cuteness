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

const NavBar = styled.div`
    position: fixed;
    background-color: #fff;
    border-color: #fff;
    height: 100vh;
    width: 80px;
    left: 0px;
    box-shadow: 3px 0 10px -5px #c1c1c1;
    padding-top: 12px;
`;

const NavCol = styled(Col)`
    & * {
        margin-bottom: 12px;
    }
`;

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
    width: 45px;
    height: auto;
    stroke: ${(props) => props.color};
    fill: ${(props) => props.color};
`;
const HomeHoveredIcon = styled(BsHouseDoorFill)`
    width: 45px;
    height: auto;
    stroke: ${(props) => props.color};
    fill: ${(props) => props.color};
`;

const HeartIcon = styled(BsHeartFill)`
    width: 45px;
    height: auto;
    stroke: ${(props) => props.color};
    fill: ${(props) => props.color};
`;
const HeartHoveredIcon = styled(BsHeartFill)`
    width: 45px;
    height: auto;
    stroke: ${(props) => props.color};
    fill: ${(props) => props.color};
`;

export default function (props) {
    // console.log(props);
    return (
        <NavBar>
            <Container>
                <Row style={{ height: "100vh" }}>
                    <NavCol>
                        <NavButton
                            onMouseEnter={props.handleMouseEnterHome}
                            onMouseLeave={props.handleMouseLeaveHome}
                            onClick={props.handleClickHome}
                        >
                            {props.isHomeHovered ? (
                                <HomeHoveredIcon color={"rgb(255, 0, 0)"} />
                            ) : (
                                <HomeIcon color={"rgb(150,150,150)"} />
                            )}
                        </NavButton>
                        <NavButton
                            onMouseEnter={props.handleMouseEnterHeart}
                            onMouseLeave={props.handleMouseLeaveHeart}
                            onClick={props.handleClickHeart}
                        >
                            {props.isHeartHovered ? (
                                <HeartHoveredIcon color={"rgb(255,0,0)"} />
                            ) : (
                                <HeartIcon color={"rgb(150,150,150)"} />
                            )}
                        </NavButton>
                    </NavCol>
                </Row>
            </Container>
        </NavBar>
    );
}
