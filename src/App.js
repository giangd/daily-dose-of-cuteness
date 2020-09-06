import React from "react";
import Heading from "./Components/Heading";
import axios from "axios";
import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import cloneDeep from "lodash/cloneDeep";
import MasonryImages from "./MasonryImages";
import { FiExternalLink } from "react-icons/fi";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsHeartFill, BsHouseDoorFill } from "react-icons/bs";

const NavButton = styled.button`
    position: relative;
    width: 50px;
    height: 50px;
    background-color: Transparent;
    border: none;
    margin-left: auto;
    margin-right: auto;
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

const HomeIcon = styled(BsHouseDoorFill)`
    width: 40px;
    height: auto;
    stroke: grey;
    fill: grey;
`;
const HomeHoveredIcon = styled(BsHouseDoorFill)`
    width: 40px;
    height: auto;
    stroke: red;
    fill: red;
`;

const HeartIcon = styled(BsHeartFill)`
    width: 40px;
    height: auto;
    stroke: grey;
    fill: grey;
`;
const HeartHoveredIcon = styled(BsHeartFill)`
    width: 40px;
    height: auto;
    stroke: red;
    fill: red;
`;

const dogSubreddits = [
    "dogs_getting_dogs",
    "AirSwimming",
    "dogswithjobs",
    "slammywhammies",
    "BeachDogs",
    "beagle",
    "bernesemountaindogs",
    "blurrypicturesofdogs",
    "BorderCollie",
    "Boxer",
    "Bulldogs",
    "corgi",
    "dogpictures",
    "dogswearinghats",
    "germanshepherds",
    "Greyhounds",
    "labrador",
    "lookatmydog",
    "mutt",
    "pitbulls",
    "pug",
    "rarepuppers",
    "shiba",
    "WhatsWrongWithYourDog",
    "woof_irl",
    "Zoomies",
];

const catSubreddits = ["MEOW_IRL", "cats"];

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }
    &.app {
        position: relative;
    }
`;

class App extends React.Component {
    state = {
        mediaObjects: [], // array of objects
        currentPage: "homePage",
        categories: {
            dogs: {},
            cats: {},
        },
        isHeartHovered: false,
    };
    handleMouseEnterHome = (e) => {
        console.log("enter w");
        console.log(e.target);

        this.setState(
            {
                isHomeHovered: true,
            },
            () => {
                console.log(this.state);
            }
        );
    };

    handleMouseLeaveHome = (e) => {
        console.log("exit w");
        console.log(e.target);

        this.setState(
            {
                isHomeHovered: false,
            },
            () => {
                console.log(this.state);
            }
        );
    };
    handleMouseEnterHeart = (e) => {
        console.log("enter w");
        console.log(e.target);

        this.setState(
            {
                isHeartHovered: true,
            },
            () => {
                console.log(this.state);
            }
        );
    };

    handleMouseLeaveHeart = (e) => {
        console.log("exit w");
        console.log(e.target);

        this.setState(
            {
                isHeartHovered: false,
            },
            () => {
                console.log(this.state);
            }
        );
    };
    handleCategoryClick = (e) => {
        console.log(e.target.value);
        this.setState(
            {
                categories: this.getInitialSubredditData(),
                mediaObjects: [],
                currentPage: `${e.target.value}`,
            },
            () => {
                console.log(this.state);
                this.fetchBasedOnWeights();
            }
        );
    };

    handleClick = () => {
        console.log("clicked");
        this.setState({ mediaObjects: [], currentPage: "cats" }, () => {
            this.fetchBasedOnWeights();
        });
    };

    componentDidMount() {
        // this.setState({ categories: this.getInitialSubredditData() }, () => {
        //     this.fetchBasedOnWeights();
        // });
    }

    getInitialSubredditData = () => {
        const newCategories = cloneDeep(this.state.categories);

        for (const name of dogSubreddits) {
            newCategories.dogs[name] = {
                weight: 1,
                normalizedWeight: undefined,
                afterId: undefined,
            };
        }

        for (const name of catSubreddits) {
            newCategories.cats[name] = {
                weight: 1,
                normalizedWeight: undefined,
                afterId: undefined,
            };
        }

        // console.log(newCategories);

        const normalizedInitialData = this.getNormalizedSubredditData(
            newCategories
        );
        // console.log(normalizedInitialData);

        return normalizedInitialData;
    };

    getNormalizedSubredditData = (categories) => {
        for (const categoryName in categories) {
            let sum = 0;
            // console.log(categoryName);
            for (const subredditName in categories[categoryName]) {
                const subredditObj = categories[categoryName][subredditName];
                sum += subredditObj.weight;
            }

            for (const subredditName in categories[categoryName]) {
                const subredditObj = categories[categoryName][subredditName];
                subredditObj.normalizedWeight = subredditObj.weight / sum;
                // console.log(subredditObj.normalizedWeight);
            }
        }

        return categories;
    };

    fetchBasedOnWeights = () => {
        // console.log("fetching based on weights");
        const maxImages = 25;

        const subredditsToFetchFrom = {};
        for (
            let numImagesFetched = 0;
            numImagesFetched < maxImages;
            numImagesFetched++
        ) {
            let random = Math.random();
            let namesIndex = 0;
            let names = Object.keys(
                this.state.categories[this.state.currentPage]
            );
            let data;

            // console.log(names);

            while (random > 0) {
                data = this.state.categories[this.state.currentPage][
                    names[namesIndex]
                ];
                random -= data.normalizedWeight;
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

        // console.log("result");
        // console.log(subredditsToFetchFrom);

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
        const config = {
            params: {
                // t: "all",
                raw_json: 1,
                limit: numImages - 1,
                after: `${
                    this.state.categories[this.state.currentPage][name].afterId
                }`,
            },
            crossdomain: true,
        };

        axios
            .get(apiCall, config)
            .then((response) => {
                let afterId = response.data.data.after;

                // if any of the subreddits have this afterId, throw new Error("Error");
                for (const name in this.state.categories[
                    this.state.currentPage
                ]) {
                    if (
                        this.state.categories[this.state.currentPage][name]
                            .afterId === afterId
                    ) {
                        throw new Error("duplicate after ids found");
                    }
                }

                let arrayOfPostObjects;
                arrayOfPostObjects = [...response.data.data.children];

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
                            mediaObject.subreddit = `${postObject.data.subreddit}`;
                            mediaObject.url = `${postObject.data.secure_media.oembed.thumbnail_url}`; // compressed gif, can get uncompressed version
                            mediaObject.height = `${postObject.data.secure_media.oembed.thumbnail_height}`;
                            mediaObject.width = `${postObject.data.secure_media.oembed.thumbnail_width}`;

                            break;
                        case "hosted:video": // reddit video
                            // console.log("reddit video");
                            mediaObject.type = "reddit video";
                            mediaObject.subreddit = `${postObject.data.subreddit}`;

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
                            mediaObject.subreddit = `${postObject.data.subreddit}`;

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

                const newMediaObjects = cloneDeep(
                    this.state.mediaObjects
                ).concat(mediaObjects);

                // update subreddit[index].afterId
                const newCategories = cloneDeep(this.state.categories);
                console.log("newCategories:");
                console.log(newCategories);

                newCategories[this.state.currentPage][name].afterId = afterId;

                this.setState({
                    mediaObjects: newMediaObjects,
                    categories: newCategories,
                });
            })

            .catch((e) => {
                if (e.message === "duplicate after ids found") {
                    // console.log("duplicate after ids found");
                } else if (e.message === "duplicate media ids found") {
                    // console.log("duplicate media ids found");
                } else {
                    console.error("unknown error in fetchImageFromSubreddit:"); // cont here
                    console.log(e);
                    console.log(e.message === "duplicate media ids found");
                }
            });
    };

    handleHeartClick = (mediaObject) => {
        const newMediaObjects = cloneDeep(this.state.mediaObjects);
        const subredditName = mediaObject.subreddit;
        let newCategories = cloneDeep(this.state.categories);

        // update isHeartClicked of this.state.mediaObjects
        // update weighting of this.state.categories
        if (this.state.mediaObjects[mediaObject.index].isHeartClicked) {
            // should unheart
            newMediaObjects[mediaObject.index].isHeartClicked = false;
            newCategories[this.state.currentPage][subredditName].weight -= 10;
        } else {
            // should heart
            newMediaObjects[mediaObject.index].isHeartClicked = true;
            newCategories[this.state.currentPage][subredditName].weight += 10;
        }

        newCategories = this.getNormalizedSubredditData(newCategories);

        this.setState(
            {
                mediaObjects: newMediaObjects,
                categories: newCategories,
            },
            () => {
                console.log(this.state);
            }
        );
    };

    render() {
        const renderNavBar = () => {
            return null;
        };
        const renderCategoryPage = () => {
            if (
                this.state.currentPage !== "hearted" &&
                this.state.currentPage !== "homePage"
            ) {
                return (
                    <>
                        <Row>
                            <Col>
                                <Heading></Heading>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <MasonryImages
                                    {...this.state}
                                    handleHeartClick={this.handleHeartClick}
                                    fetchBasedOnWeights={
                                        this.fetchBasedOnWeights
                                    }
                                ></MasonryImages>
                            </Col>
                        </Row>
                    </>
                );
            }
        };

        const renderHomePage = () => {
            if (this.state.currentPage === "homePage") {
                return (
                    <>
                        <h1 className="text-center">Daily Dose of Cuteness</h1>
                        <Row>
                            <Col className="text-center">
                                <Button
                                    value="dogs"
                                    onClick={this.handleCategoryClick}
                                >
                                    Dogs
                                </Button>
                                <Button
                                    value="cats"
                                    onClick={this.handleCategoryClick}
                                >
                                    Cats
                                </Button>
                                <Button
                                    value="dogs"
                                    onClick={this.handleCategoryClick}
                                >
                                    Dogs
                                </Button>
                                <Button
                                    value="dogs"
                                    onClick={this.handleCategoryClick}
                                >
                                    Dogs
                                </Button>
                            </Col>
                        </Row>
                    </>
                );
            }
        };

        return (
            <div className="app">
                <GlobalStyle />
                <div
                    className="navBar"
                    style={{
                        position: "fixed",
                        backgroundColor: "darkBlue",
                        height: "100vh",
                        width: "100px",
                        left: "0px",
                    }}
                >
                    <Container>
                        <Row
                            className="block-center"
                            style={{ height: "100vh" }}
                        >
                            {/* className="d-flex justify-content-center" */}
                            <Col
                                style={{
                                    textAlign: "center",
                                    border: "1px solid",
                                }}
                            >
                                <NavButton
                                    onMouseEnter={this.handleMouseEnterHome}
                                    onMouseLeave={this.handleMouseLeaveHome}
                                >
                                    {this.state.isHomeHovered ? (
                                        <HomeHoveredIcon />
                                    ) : (
                                        <HomeIcon />
                                    )}
                                </NavButton>
                                <NavButton
                                    onMouseEnter={this.handleMouseEnterHeart}
                                    onMouseLeave={this.handleMouseLeaveHeart}
                                >
                                    {this.state.isHeartHovered ? (
                                        <HeartHoveredIcon />
                                    ) : (
                                        <HeartIcon />
                                    )}
                                </NavButton>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div style={{ marginLeft: "100px" }}>
                    <Container
                        className="fluid .mx-0"
                        // style={{ float: "right" }}
                    >
                        <Row>
                            {/* fixed column here */}
                            <Col>
                                {renderCategoryPage()}
                                {renderHomePage()}
                            </Col>
                            {/* fixed column here */}
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default App;
