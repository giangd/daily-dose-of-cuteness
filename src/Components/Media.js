import React from "react";
import styled from "styled-components";
// import ReactPlayer from "react-player";

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

// const ReactPlayerStyles = {
//     width: "1%",
//     // height: "100%",
// };

// const VideoWrapper = styled.div`
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
// `;

// { type, id, link, url, height, width }
export default function (props) {
    console.log(props.type);

    switch (props.type) {
        case "image":
        case "gif":
            return <Image src={props.url} alt="" />;
        case "reddit video":
            // return (
            //     <ReactPlayer
            //         url={props.url}
            //         controls={true}
            //         style={ReactPlayerStyles}
            //         width="100%"
            //         height="100%"
            //     />
            // );
            return (
                <Video autoPlay="autoplay">
                    <source src={props.url}></source>
                </Video>
            );
        case "link":
            return (
                <Image
                    src="https://d1bho1zozx21dx.cloudfront.net/app/uploads/2016/09/19153808/web-link.jpg"
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
