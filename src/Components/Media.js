import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Video = styled.video`
    width: 100%;
    height: auto;
`;

const StyleWrapper = styled.div`
    position: relative;
`;

const Overlay = styled.p`
    position: absolute;
    z-index: 100;
    bottom: 0;
    color: red;
`;

export default class extends React.Component {
    constructor(props) {
        super();
        this.state = {
            ...props,
            videoRef: React.createRef(),
            showOverlay: false,
        };
    }

    handleClick = () => {
        if (this.state.videoRef.current.paused) {
            this.state.videoRef.current.play();
        } else {
            this.state.videoRef.current.pause();
        }
    };

    handleMouseOver = () => {
        console.log("mouseOver");
        this.setState({ showOverlay: true });
    };

    handleMouseLeave = () => {
        console.log("mouseLeave");
        this.setState({ showOverlay: false });
    };

    render() {
        switch (this.state.type) {
            case "image":
            case "gif":
                // return <Image src={props.url} alt="" />;
                return (
                    <StyleWrapper>
                        <Overlay>test</Overlay>

                        <Card
                            onMouseEnter={this.handleMouseOver}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Card.Img src={this.state.url} alt=""></Card.Img>
                        </Card>
                    </StyleWrapper>
                );
            case "reddit video":
                return (
                    <Video
                        ref={this.state.videoRef}
                        autoPlay="autoplay"
                        loop
                        onClick={this.handleClick}
                        poster={this.state.posterUrl}
                    >
                        <source src={this.state.url}></source>
                    </Video>
                );
            case "link":
            // return (
            //     <Image
            //         src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
            //         alt=""
            //     />
            // );
            default:
                return "";
            // return (
            //     <Image
            //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1200px-Question_mark_%28black%29.svg.png"
            //         alt=""
            //     />
            // );
        }
    }
}

// { type, id, link, url, height, width }
// export default function (props) {
//     let videoRef = React.createRef();

//     function handleClick() {
//         // console.log("clicked");
//         // console.log(videoRef.current.paused);
//         if (videoRef.current.paused) {
//             videoRef.current.play();
//         } else {
//             videoRef.current.pause();
//         }
//     }

//     function handleMouseOver() {
//         console.log("mouseOver");
//     }

//     function handleMouseLeave() {
//         console.log("mouseLeave");
//     }

//     switch (props.type) {
//         case "image":
//         case "gif":
//             // return <Image src={props.url} alt="" />;

//             return (
//                 <Card
//                     onMouseEnter={handleMouseOver}
//                     onMouseLeave={handleMouseLeave}
//                 >
//                     <Card.Img src={props.url} alt=""></Card.Img>
//                     <Card.ImgOverlay>
//                         <Card.Footer styles={{ position: "relative" }}>
//                             <Card.Link
//                                 styles={{
//                                     position: "absolute",
//                                     top: "300px",
//                                 }}
//                                 href="#"
//                             >
//                                 Card Link
//                             </Card.Link>
//                             <Card.Link href="#">Another Link</Card.Link>
//                         </Card.Footer>
//                     </Card.ImgOverlay>
//                 </Card>
//             );
//         case "reddit video":
//             return (
//                 <Video
//                     ref={videoRef}
//                     autoPlay="autoplay"
//                     loop
//                     onClick={handleClick}
//                     poster={props.posterUrl}
//                 >
//                     <source src={props.url}></source>
//                 </Video>
//             );
//         case "link":
//         // return (
//         //     <Image
//         //         src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
//         //         alt=""
//         //     />
//         // );
//         default:
//             return "";
//         // return (
//         //     <Image
//         //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1200px-Question_mark_%28black%29.svg.png"
//         //         alt=""
//         //     />
//         // );
//     }
// }
