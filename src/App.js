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
        mediaObjects: [],
        afterId: undefined,
        subreddits: {},
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

        console.log(subredditsToFetchFrom); // todo: test to make sure all probabilities are correct, and then fetch images
        console.log(this.state.subreddits);
        for (const name in subredditsToFetchFrom) {
            // console.log(subredditsToFetchFrom[name].numImages);
            this.fetchImageFromSubreddit(
                name,
                subredditsToFetchFrom[name].numImages
            );
        }

        // for (const name in subredditsToFetchFrom) {
        //     this.fetchImageFromSubreddit(
        //         subredditsToFetchFrom[name].index,
        //         subredditsToFetchFrom[name].numImages
        //     );
        //     // // console.log(subreddit);
        // }
        // subredditsToFetchFrom()
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

        axios
            .get(apiCall, config)
            .then((response) => {
                let arrayOfPostObjects;
                arrayOfPostObjects = [...response.data.data.children];

                // console.log(arrayOfPostObjects);
                let afterId = response.data.data.after;
                let mediaObjects = [];
                for (let postObject of arrayOfPostObjects) {
                    let postHint = postObject.data.post_hint;
                    const isPostHintKnown =
                        postHint === "rich:video" ||
                        postHint === "hosted:video" ||
                        postHint === "image" ||
                        postHint === "link" ||
                        postHint === "self";

                    // if (postObject.data.contest_mode) {
                    //     continue;
                    // }
                    // if (!postHint) {
                    //     continue;
                    // }
                    // if (postHint === "self") {
                    //     continue;
                    // }
                    // if (postObject.data.stickied) {
                    //     continue;
                    // }
                    // if (postObject.data.gallery_data) {
                    //     continue;
                    // }
                    // if (
                    //     postObject.data.crosspost_parent_list &&
                    //     !isPostHintKnown
                    // ) {
                    //     postObject = {
                    //         data: postObject.data.crosspost_parent_list[0],
                    //     };

                    //     // console.log("new:");
                    //     // console.log(postObject);
                    //     postHint = postObject.data.post_hint;
                    // }
                    // if (postObject.data.removed_by_category) {
                    //     continue;
                    // }
                    // if (!postObject.data.media && postObject.data.is_self) {
                    //     continue;
                    // }
                    // if (
                    //     postObject.data.author === "[deleted]" ||
                    //     postObject.data.selftext === "[deleted]"
                    // ) {
                    //     continue;
                    // }
                    // if (
                    //     !postObject.data.media &&
                    //     !postObject.data.secure_media &&
                    //     !postObject.data.secure_media_embed &&
                    //     postObject.data.secure_media_embed.keys().length === 0
                    // ) {
                    //     continue;
                    // }

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
                        case "link": // image
                        // console.log(
                        //     `link: www.reddit.com${mediaObject.redditLink}`
                        // );
                        // mediaObject.type = "link";

                        // mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

                        // mediaObject.url =
                        //     postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        // mediaObject.height =
                        //     postObject.data.preview.images[0].source.height;
                        // mediaObject.width =
                        //     postObject.data.preview.images[0].source.width;
                        // -------------------------------------------------------
                        //     if (postObject.data.url) {
                        //         mediaObject.url = `${postObject.data.url}`;
                        //     } else if (
                        //         postObject.data.url_overridden_by_dest
                        //     ) {
                        //         mediaObject.url = `${postObject.data.url_overridden_by_dest}`;
                        //     }
                        // } else {
                        //     // console.log("still a link");

                        //     mediaObject.type = "link";

                        //     mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

                        //     mediaObject.url =
                        //         postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        //     mediaObject.height =
                        //         postObject.data.preview.images[0].source.height;
                        //     mediaObject.width =
                        //         postObject.data.preview.images[0].source.width;
                        // }
                        // break;
                        case "self":
                        default:
                            // console.error(`unknown: ${postHint}`);
                            // console.log(postObject);
                            continue;
                        // mediaObject.type = "uknown";
                        // mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

                        // mediaObject.url =
                        //     postObject.data.preview.images[0].source.url; // highest resolution, can get lower
                        // mediaObject.height =
                        //     postObject.data.preview.images[0].source.height;
                        // mediaObject.width =
                        //     postObject.data.preview.images[0].source.width;
                    }
                    // console.log(postObject);

                    mediaObjects.push(mediaObject);
                    // // console.log("pushed: ");
                    // // console.log(mediaObject);
                    // // console.log("---------------------------");
                }

                // append mediaObjects
                const newMediaObjects = this.state.mediaObjects
                    .slice()
                    .concat(mediaObjects);

                // update subreddit[index].afterId
                const newSubreddits = Object.assign({}, this.state.subreddits);
                newSubreddits[name].afterId = afterId;
                // console.log("here");
                // console.log(newSubreddits);
                // console.log("");
                // newSubreddits[name].afterId = afterId;

                let shouldPause = true;
                let hasCalledSetState = false;
                while (shouldPause) {
                    console.log("paused");
                    if (!hasCalledSetState) {
                        hasCalledSetState = true;
                        this.setState(
                            {
                                mediaObjects: newMediaObjects,
                                subreddits: newSubreddits,
                            },
                            () => {
                                shouldPause = false;
                            }
                        );
                    }
                }
            })
            .catch((e) => {
                console.error("error in fetchImageFromSubreddit:"); // cont here
                console.log(e);
            });
    };

    // fetchImages = () => {
    //     // console.log("fetching...");

    //     const subreddit = "aww";

    //     const apiCall = `https://www.reddit.com/r/${subreddit}/hot.json`;
    //     // const apiRequest = ".json?raw_json=1";
    //     const parameters = {
    //         params: {
    //             raw_json: 1,
    //             limit: 15,
    //             after: `${this.state.afterId}`,
    //         },
    //     };

    //     axios.get(apiCall, parameters).then((response) => {
    //         let arrayOfPostObjects;
    //         arrayOfPostObjects = [...response.data.data.children];

    //         // console.log(arrayOfPostObjects);
    //         let afterId = response.data.data.after;
    //         let mediaObjects = [];
    //         for (let postObject of arrayOfPostObjects) {
    //             let postHint = postObject.data.post_hint;

    //             let mediaObject = {
    //                 type: undefined,
    //                 id: undefined,
    //                 subreddit: undefined,
    //                 redditLink: undefined,
    //                 url: undefined,
    //                 posterUrl: undefined,
    //                 height: undefined,
    //                 width: undefined,
    //                 isHeartClicked: false,
    //             };

    //             mediaObject.id = `${postObject.data.id}`;
    //             mediaObject.redditLink = `${postObject.data.permalink}`;

    //             switch (postHint) {
    //                 case "rich:video": // gif
    //                     // console.log("gif");
    //                     mediaObject.type = "gif";
    //                     mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;
    //                     mediaObject.url = `${postObject.data.secure_media.oembed.thumbnail_url}`; // compressed gif, can get uncompressed version
    //                     mediaObject.height = `${postObject.data.secure_media.oembed.thumbnail_height}`;
    //                     mediaObject.width = `${postObject.data.secure_media.oembed.thumbnail_width}`;

    //                     break;
    //                 case "hosted:video": // reddit video
    //                     // console.log("reddit video");
    //                     mediaObject.type = "reddit video";
    //                     mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

    //                     // mediaObject.url =
    //                     // postObject.data.preview.images[0].source.url; // highest resolution, can get lower
    //                     mediaObject.url =
    //                         postObject.data.media.reddit_video.fallback_url;
    //                     mediaObject.posterUrl =
    //                         postObject.data.preview.images[0].source.url; // highest resolution, can get lower
    //                     mediaObject.height =
    //                         postObject.data.media.reddit_video.height;
    //                     mediaObject.width =
    //                         postObject.data.media.reddit_video.width;
    //                     break;
    //                 case "image": // image
    //                     // console.log("image");
    //                     mediaObject.type = "image";
    //                     mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

    //                     mediaObject.url =
    //                         postObject.data.preview.images[0].source.url; // highest resolution, can get lower
    //                     mediaObject.height =
    //                         postObject.data.preview.images[0].source.height;
    //                     mediaObject.width =
    //                         postObject.data.preview.images[0].source.width;
    //                     break;
    //                 case "link": // image
    //                     // console.log(
    //                         `link: www.reddit.com${mediaObject.redditLink}`
    //                     );
    //                     mediaObject.type = "link";
    //                     mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

    //                     mediaObject.url =
    //                         postObject.data.preview.images[0].source.url; // highest resolution, can get lower
    //                     mediaObject.height =
    //                         postObject.data.preview.images[0].source.height;
    //                     mediaObject.width =
    //                         postObject.data.preview.images[0].source.width;
    //                     break;
    //                 default:
    //                     // console.log("unknown");
    //                     mediaObject.type = "uknown";
    //                     mediaObject.subreddit = `${postObject.data.subreddit_name_prefixed}`;

    //                     mediaObject.url =
    //                         postObject.data.preview.images[0].source.url; // highest resolution, can get lower
    //                     mediaObject.height =
    //                         postObject.data.preview.images[0].source.height;
    //                     mediaObject.width =
    //                         postObject.data.preview.images[0].source.width;
    //                     break;
    //             }

    //             mediaObjects.push(mediaObject);
    //         }

    //         this.setState(
    //             (prevState) => {
    //                 return {
    //                     mediaObjects: prevState.mediaObjects.concat(
    //                         mediaObjects
    //                     ),
    //                     afterId,
    //                 };
    //             },
    //             () => {
    //                 // console.log("done");
    //             }
    //         );
    //     });
    // };

    handleHeartClick = (mediaObject) => {
        // // console.log(e);

        const oldMediaObjects = this.state.mediaObjects;
        const newMediaObjects = oldMediaObjects.slice();

        newMediaObjects[mediaObject.index].isHeartClicked = !newMediaObjects[
            mediaObject.index
        ].isHeartClicked;

        // console.log(`clciked:`);
        // console.log(mediaObject);

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
