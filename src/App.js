import React from "react";
import Heading from "./Components/Heading";
import Loader from "./Components/Loader";
import Media from "./Components/Media";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import styled, { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import Masonry from "react-masonry-css";
// import "./MasonryStyles.css";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    &.app {
        position: relative;
    }

    /* whole grid */
    &.my-masonry-grid {
        display: -webkit-box; /* Not needed if autoprefixing */
        display: -ms-flexbox; /* Not needed if autoprefixing */
        display: flex;
        width: 75vw; /* 100vw * 0.75 - 17px */
        position: absolute;
        margin-left: calc((100vw - 75vw) / 2 - 17px)
    }

    /* grid columns */
    &.my-masonry-grid_column {
        background-clip: padding-box;
    }

    /* individual items */
    &.my-masonry-grid_column > * {
        margin-bottom: -4px;
    }
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

                let mediaObject = {
                    type: undefined,
                    id: undefined,
                    link: undefined,
                    url: undefined,
                    posterUrl: undefined,
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
                        // mediaObject.url =
                        // postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        mediaObject.url =
                            postObject.data.media.reddit_video.fallback_url;
                        mediaObject.posterUrl =
                            postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        mediaObject.height =
                            postObject.data.media.reddit_video.height;
                        mediaObject.width =
                            postObject.data.media.reddit_video.width;
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
                    case "link": // image
                        mediaObject.type = "link";
                        mediaObject.url =
                            postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        console.log(`link: ${mediaObject.url}`);
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
            <div className="app">
                <GlobalStyle />
                <Heading></Heading>

                <InfiniteScroll
                    dataLength={this.state.mediaObjects.length}
                    next={this.fetchImages}
                    hasMore={true}
                    git
                    style={{ overflow: "hidden" }}
                ></InfiniteScroll>
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {this.state.mediaObjects.map((mediaObject) => {
                        return (
                            <Media {...mediaObject} key={`${mediaObject.id}`} />
                        );
                    })}
                </Masonry>
            </div>
        );
    }
}

export default App;
