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

const dogSubreddits = [
    "dogs_getting_dogs",
    "AirSwimming",
    "dogswithjobs",
    "slammywhammies",
];

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
        /* margin-bottom: -6px; */
    }
`;

class App extends React.Component {
    state = {
        mediaObjects: [], // array of objects
        afterId: undefined,
        subreddits: {}, // object of subreddit names as keys and subreddit data as object values
    };

    componentDidMount() {
        this.setState({ subreddits: this.getInitialSubredditData() }, () => {
            // console.log(this.state);t
            this.fetchBasedOnWeights();
        });
    }

    getInitialSubredditData = () => {
        // // console.log(dogSubreddits);
        const newSubreddits = this.state.subreddits;
        for (const name of dogSubreddits) {
            newSubreddits[name] = {
                weight: 1,
                normalizedWeight: undefined,
                afterId: undefined,
            };
            // // console.log(name);
        }

        // testinng start
        // newSubreddits["dogs_getting_dogs"].weight = 2;
        // newSubreddits["AirSwimming"].weight = 1;
        // newSubreddits["dogswithjobs"].weight = 5;

        // newSubreddits["slammywhammies"].weight = 2;
        //testing end

        // // console.log(newSubreddits);
        const normalizedInitialData = this.getNormalizedSubredditData(
            newSubreddits
        );
        // console.log(`type: ${typeof normalized}results normalized:`);
        console.log(normalizedInitialData);

        // this.setState(normalized);
        return normalizedInitialData;
    };

    getNormalizedSubredditData = (subreddits) => {
        // let length = subreddits.length;
        let sum = 0;
        for (const name in subreddits) {
            sum += subreddits[name].weight;
            // console.log(subreddits[name].weight);
        }

        for (const name in subreddits) {
            subreddits[name].normalizedWeight = subreddits[name].weight /= sum;
            // console.log(subreddits[name].weight);
        }
        // console.log("normalized:");
        // console.log(subreddits);

        return subreddits;
    };

    /*

    // increment weight

    this.fetchBasedonWeights()


    
    */

    fetchBasedOnWeights = () => {
        const maxImages = 20;

        const subredditsToFetchFrom = {};
        for (
            let numImagesFetched = 0;
            numImagesFetched < maxImages;
            numImagesFetched++
        ) {
            let random = Math.random();
            let namesIndex = 0;
            // console.log(this.state.subreddits);
            let names = Object.keys(this.state.subreddits);
            let data;

            while (random > 0) {
                data = this.state.subreddits[names[namesIndex]];
                random -= data.weight;
                namesIndex++;
            }
            namesIndex--;

            let chosenName = names[namesIndex];

            // increment numImages of selected subreddit
            if (chosenName in subredditsToFetchFrom) {
                subredditsToFetchFrom[chosenName] = {
                    namesIndex,
                    numImages: subredditsToFetchFrom[chosenName].numImages + 1,
                };
            } else {
                subredditsToFetchFrom[chosenName] = {
                    namesIndex,
                    numImages: 1,
                };
            }
        }

        for (const name in subredditsToFetchFrom) {
            this.fetchImageFromSubreddit(
                name,
                subredditsToFetchFrom[name].numImages
            );
        }
    };

    // index for what?
    fetchImageFromSubreddit = (name, numImages) => {
        // console.log("fetching...");

        const apiCall = `https://www.reddit.com/r/${name}/hot.json`;
        // const apiCall = `https://www.reddit.com/r/${this.state.subreddits[index].name}/top.json`; // todo: remove this after testing
        const config = {
            params: {
                // t: "all",
                raw_json: 1,
                limit: numImages - 1,
                after: `${this.state.subreddits[name].afterId}`,
            },
            crossdomain: true,
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            //     //     "Access-Control-Allow-Credentials": "true",
            //     //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            //     //     "Access-Control-Allow-Headers":
            //     //         "POST, GET, PUT, DELETE, OPTIONS, HEAD, authorization",
            //     //     "Access-Control-Allow-Headers":
            //     //         "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            // },
        };

        // const newState = {};

        axios
            .get(apiCall, config)
            .then((response) => {
                let afterId = response.data.data.after;

                // if any of the subreddits have this afterId, throw new Error("Error");
                for (const name in this.state.subreddits) {
                    if (this.state.subreddits[name].afterId === afterId) {
                        throw new Error("duplicate after ids found");
                    }
                }

                let arrayOfPostObjects;
                arrayOfPostObjects = [...response.data.data.children];

                // console.log(arrayOfPostObjects);
                let mediaObjects = [];
                for (let postObject of arrayOfPostObjects) {
                    let postHint = postObject.data.post_hint;
                    // if any of the mediaObjects have this postId, throw error
                    for (const object of this.state.mediaObjects) {
                        if (object.id === `${postObject.data.id}`) {
                            throw new Error("duplicate media ids found");
                        }
                    }

                    let mediaObject = {
                        type: undefined,
                        id: undefined,
                        subreddit: undefined,
                        redditLink: undefined,
                        url: undefined,
                        posterUrl: undefined,
                        height: undefined,
                        width: undefined,
                        isHeartClicked: false,
                    };

                    mediaObject.id = `${postObject.data.id}`;
                    mediaObject.redditLink = `${postObject.data.permalink}`;

                    switch (postHint) {
                        case "rich:video": // gif
                            // console.log("gif");
                            mediaObject.type = "gif";
                            mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;
                            mediaObject.url = `${postObject.data.secure_media.oembed.thumbnail_url}`; // compressed gif, can get uncompressed version
                            mediaObject.height = `${postObject.data.secure_media.oembed.thumbnail_height}`;
                            mediaObject.width = `${postObject.data.secure_media.oembed.thumbnail_width}`;

                            break;
                        case "hosted:video": // reddit video
                            // console.log("reddit video");
                            mediaObject.type = "reddit video";
                            mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

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
                            // console.log("image");
                            mediaObject.type = "image";
                            mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

                            mediaObject.url =
                                postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                            mediaObject.height =
                                postObject.data.preview.images[0].source.height;
                            mediaObject.width =
                                postObject.data.preview.images[0].source.width;
                            break;
                        case "link":
                        case "self":
                        default:
                            continue;
                    }
                    mediaObjects.push(mediaObject);
                }

                // append mediaObjects
                const newMediaObjects = this.state.mediaObjects
                    .slice()
                    .concat(mediaObjects);

                // update subreddit[index].afterId
                const newSubreddits = Object.assign({}, this.state.subreddits);
                newSubreddits[name].afterId = afterId;

                this.setState({
                    mediaObjects: newMediaObjects,
                    subreddits: newSubreddits,
                });
            })
            .catch((e) => {
                if (e.message === "duplicate after ids found") {
                    console.log("duplicate after ids found");
                } else if (e.message === "duplicate media ids found") {
                    console.log("duplicate media ids found");
                } else {
                    console.error("unknown error in fetchImageFromSubreddit:"); // cont here
                    console.log(e);
                    console.log(e.message === "duplicate media ids found");
                }
            });
    };

    handleHeartClick = (mediaObject) => {
        // // console.log(e);

        const oldMediaObjects = this.state.mediaObjects;
        const newMediaObjects = oldMediaObjects.slice();

        newMediaObjects[mediaObject.index].isHeartClicked = !newMediaObjects[
            mediaObject.index
        ].isHeartClicked;

        // console.log(`clciked:`);
        // console.log(mediaObject);

        console.log(this.state.mediaObjects);

        this.setState({
            mediaObjects: newMediaObjects,
        });
    };

    render() {
        return (
            <div className="app">
                <GlobalStyle />
                <Heading></Heading>

                <InfiniteScroll
                    dataLength={this.state.mediaObjects.length}
                    next={this.fetchBasedOnWeights}
                    hasMore={true}
                    git
                    style={{ overflow: "hidden" }}
                ></InfiniteScroll>
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {this.state.mediaObjects.map((mediaObject, index) => {
                        return (
                            <Media
                                {...mediaObject}
                                handleHeartClick={this.handleHeartClick}
                                index={index}
                                key={`${mediaObject.id}`}
                            />
                        );
                    })}
                </Masonry>
            </div>
        );
    }
}

export default App;
