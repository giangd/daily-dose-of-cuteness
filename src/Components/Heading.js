import React from "react";
import styled from "styled-components";


const Header = styled.header`
    max-width: 70rem;
    margin: 2rem auto;
    text-align: center;
`;

const H1 = styled.h1`
    font-family: "Oswald", Arial, Helvetica, sans-serif;
    margin-bottom: 1em;
`;

export default function Heading() {
    return (
        <Header>
            <H1>Cute Images</H1>
            <p>From reddit.com/r/aww</p>
        </Header>
    );
}
