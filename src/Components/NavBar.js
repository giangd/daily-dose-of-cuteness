import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";

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
    z-index: 1000;
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
