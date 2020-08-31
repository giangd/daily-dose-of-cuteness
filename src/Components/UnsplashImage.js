import React from "react";
import styled from "styled-components";

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export default function UnsplashImage({ src }) {
    return (
        <div>
            <Img src={src} alt="" />
        </div>
    );
}
