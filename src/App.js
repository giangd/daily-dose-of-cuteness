import React from "react";
import Heading from "./Components/Heading";
import Loader from "./Components/Loader";
import UnsplashImage from "./Components/UnsplashImage";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: sans-serif
    }
`;

const WrapperImage = styled.section`
    max-width: 70rem;
    margin: 4rem auto;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 300px;
`;

class App extends React.Component {
    state = {
        mediaObjects: [],
        afterId: undefined,
    };

    componentDidMount() {
        this.fetchImages();
    }

    fetchImages = () => {
        console.log("fetching...");

        const subreddit = "https://www.reddit.com/r/aww/hot.json";
        // const apiRequest = ".json?raw_json=1";
        const parameters = {
            params: {
                raw_json: 1,
                limit: 15,
                after: `${this.state.afterId}`,
            },
        };

        axios.get(subreddit, parameters).then((response) => {
            let arrayOfPostObjects;
            arrayOfPostObjects = [...response.data.data.children];

            console.log(arrayOfPostObjects);
            let afterId = response.data.data.after;
            let mediaObjects = [];
            for (let postObject of arrayOfPostObjects) {
                let postHint = postObject.data.post_hint;
                let postType;

                let mediaObject = {
                    type: undefined,
                    id: undefined,
                    link: undefined,
                    url: undefined,
                    height: undefined,
                    width: undefined,
                };

                mediaObject.id = `${postObject.data.id}`;
                mediaObject.link = `${postObject.data.permalink}`;

                switch (postHint) {
                    case "rich:video": // gif
                        console.log("gif");
                        mediaObject.type = "gif";
                        mediaObject.url = `${postObject.data.secure_media.oembed.thumbnail_url}`; // compressed gif, can get uncompressed version
                        mediaObject.height = `${postObject.data.secure_media.oembed.thumbnail_height}`;
                        mediaObject.width = `${postObject.data.secure_media.oembed.thumbnail_width}`;

                        break;
                    case "hosted:video": // reddit video
                        console.log("reddit video");
                        mediaObject.type = "reddit video";
                        mediaObject.url =
                            postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        mediaObject.height =
                            postObject.data.preview.images[0].source.height;
                        mediaObject.width =
                            postObject.data.preview.images[0].source.width;

                        break;
                    case "image": // image
                        console.log("image");
                        mediaObject.type = "image";
                        mediaObject.url =
                            postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        mediaObject.height =
                            postObject.data.preview.images[0].source.height;
                        mediaObject.width =
                            postObject.data.preview.images[0].source.width;
                        break;
                    default:
                        console.log("unknown");
                        mediaObject.type = "uknown";
                        mediaObject.url =
                            postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        mediaObject.height =
                            postObject.data.preview.images[0].source.height;
                        mediaObject.width =
                            postObject.data.preview.images[0].source.width;
                        break;
                }

                mediaObjects.push(mediaObject);
            }

            this.setState(
                (prevState) => {
                    return {
                        mediaObjects: prevState.mediaObjects.concat(
                            mediaObjects
                        ),
                        afterId,
                    };
                },
                () => {
                    console.log("done");
                }
            );
        });
    };

    render() {
        return (
            <div>
                <GlobalStyle />
                <Heading></Heading>

                <InfiniteScroll
                    dataLength={this.state.mediaObjects.length}
                    next={this.fetchImages}
                    hasMore={true}
                    loader={<Loader></Loader>}
                    style={{ overflow: "hidden" }}
                >
                    <WrapperImage>
                        {this.state.mediaObjects.map((mediaObject) => {
                            return (
                                <UnsplashImage
                                    src={`${mediaObject.url}`}
                                    alt=""
                                    key={`${mediaObject.id}`}
                                />
                            );
                        })}
                    </WrapperImage>
                </InfiniteScroll>
            </div>
        );
    }
}

export default App;
