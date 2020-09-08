import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 20px 0px 35px;
`;

export default function (props) {
    const heading =
        props.currentPage.charAt(0).toUpperCase() + props.currentPage.slice(1);
    return (
        <Wrapper>
            <h1 className="display-4 text-center">🐍{heading}🦎</h1>
            {/* <p className="lead text-center">
                🌈 A few cute pictures a day keeps the sadness away 🤗
            </p> */}
        </Wrapper>
    );
}
