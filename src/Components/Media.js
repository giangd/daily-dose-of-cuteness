import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import Button from "react-bootstrap/Button";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { FiExternalLink } from "react-icons/fi";

/*

import { FaBeer } from 'react-icons/fa';
class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}


*/

// can delete, wanted to see if this could fix the overlay gradient from overflowing
const MediaWrapper = styled.div``;

const Image = styled.img`
    position: relative;
    width: 100%;
    height: auto;
    z-index: -1;
`;

const Video = styled.video`
    position: relative;
    width: 100%;
    height: auto;
    z-index: -1;
`;

const LinkOverlay = styled.div`
    position: absolute;
    z-index: 0;
    bottom: 2px;
    /* color: red; */
    color: black;
    display: none;
`;

const HeartOverlay = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    /* -webkit-transform: translate(-50%, -50%); */
    transform: translate(-50%, -50%);

    z-index: 0;
    color: black;
    display: none;
`;

const Overlay = styled.div`
    position: relative;
    height: auto;
    display: flex;
    justify-content: center;

    overflow: hidden;

    &:hover {
        background: rgb(0, 0, 0);
        /* opacity: 0.9; */
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.15) 100%
        );

        ${LinkOverlay} {
            display: block;
        }

        ${HeartOverlay} {
            display: block;
        }
    }
`;

const LinkButton = styled.a`
    position: relative;
    width: auto;
    height: auto;
    background-color: Transparent;
    border: none;
    overflow: hidden;

    &:link {
        color: white;
    }
    &:visited {
        color: white;
    }
    &:hover {
        color: white;
        text-decoration: none;
    }
    &:focus {
        color: white;
    }
    &:active {
        color: white;
    }
`;

const LinkIcon = styled(FiExternalLink)`
    position: relative;
    height: 30px;
    width: 30px;
    margin-left: 10px;
    float: right;
`;

const LinkText = styled.p`
    position: relative;
    float: left;
    margin-top: 6px;
`;

const HeartButton = styled.button`
    position: relative;
    width: 50px;
    height: 50px;
    background-color: Transparent;
    border: none;
    float: right;
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

const HeartIcon = styled(AiOutlineHeart)`
    position: relative;
    opacity: 100;
    width: 80px;
    height: auto;
    stroke-width: 1px;
    stroke: red;
    margin-left: -10px;
    margin-top: -10px;

    fill: ${(props) => (props.clicked === "true" ? "red" : "white")};
`;

export default class extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ...props,
            // videoRef: React.createRef(),
            // isHeartClicked: false,
        };
    }

    // handleClick = () => {
    //     console.log("inside handleClick");
    //     // if (this.props.videoRef.current.paused) {
    //     //     this.props.videoRef.current.play();
    //     // } else {
    //     //     this.props.videoRef.current.pause();
    //     // }
    // };

    handleHeartClick = () => {
        this.props.handleHeartClick(this.props);
    };

    render() {
        const overlayContent = (
            <>
                <LinkOverlay>
                    <LinkButton
                        href={`https://reddit.com${this.props.redditLink}`}
                    >
                        <LinkText>{this.props.subreddit}</LinkText>
                        <LinkIcon />
                    </LinkButton>
                </LinkOverlay>
                <HeartOverlay onClick={this.handleHeartClick}>
                    <HeartButton>
                        <HeartIcon
                            clicked={this.props.isHeartClicked.toString()}
                        />
                    </HeartButton>
                </HeartOverlay>
            </>
        );

        switch (this.props.type) {
            case "image":
            case "gif":
                return (
                    <MediaWrapper>
                        <Overlay>
                            {overlayContent}
                            <Image src={this.props.url} alt=""></Image>
                        </Overlay>
                    </MediaWrapper>
                );
            case "reddit video":
                return (
                    <MediaWrapper>
                        <Overlay>
                            {overlayContent}
                            <Video
                                // ref={this.props.videoRef}
                                autoPlay="autoplay"
                                loop
                                poster={this.props.posterUrl}
                            >
                                <source src={this.props.url}></source>
                            </Video>
                        </Overlay>
                    </MediaWrapper>
                );
            case "self":
            case "link":
            default:
                return "";
        }
    }
}
