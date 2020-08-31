import React from "react";
import styled from "styled-components";
// import ReactPlayer from "react-player";

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Video = styled.video`
    width: 100%;
    height: auto;
`;

// { type, id, link, url, height, width }
export default function (props) {
    let videoRef = React.createRef();

    function handleClick() {
        // console.log("clicked");
        // console.log(videoRef.current.paused);
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }

    switch (props.type) {
        case "image":
        case "gif":
            return <Image src={props.url} alt="" />;
        case "reddit video":
            return (
                <Video
                    ref={videoRef}
                    autoPlay="autoplay"
                    loop
                    onClick={handleClick}
                >
                    <source src={props.url}></source>
                </Video>
            );
        case "link":
            return (
                <Image
                    src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
                    alt=""
                />
            );
        default:
            return (
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1200px-Question_mark_%28black%29.svg.png"
                    alt=""
                />
            );
    }
}
