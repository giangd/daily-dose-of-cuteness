import React from "react";
import styled from "styled-components";

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
    let headingText;
    let subText;

    switch (props.currentPage) {
        case "everything":
            headingText = "Everything";
            subText = "✨Everything happy and cute🎈";
            break;
        case "dogs":
            headingText = "Dogs";
            subText =
                "🐕‍🦺“Scratch a dog and you’ll find a permanent job.” – Franklin P. Jones🐶";
            break;
        case "cats":
            headingText = "Cats";
            subText =
                "🐈“Time spent with cats is never wasted.” – Sigmund Freud😸";
            break;
        case "reptiles":
            headingText = "Reptiles";
            subText = "🐍“Hissss hisssss hiss hissssss.” – A Snake🐍";
            break;
        case "birds":
            headingText = "Birds";
            subText =
                "🐦“When birds burp, it must taste like bugs.” – Bill Watterson🐣";
            break;
        case "heartedPage":
            headingText = "Things You've Hearted";
            subText = "✨Everything happy and cute🎈";
            break;
        default:
    }
    return (
        <Wrapper>
            <h1 className="display-4 text-center">{headingText}</h1>
            <p className="lead text-center">{subText}</p>
        </Wrapper>
    );
}
