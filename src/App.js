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

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsHeartFill, BsHouseDoorFill } from "react-icons/bs";

import NavBar from "./Components/NavBar";

const subreddits = {
    dogs: [
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
    ],
    cats: [
        "MEOW_IRL",
        "cats",
        "Catspotting",
        "Kitten",
        "FromKittenToCat",
        "illegallybigcats",
        "SleepingCats",
        "grumpycats",
        "kittens",
        "TruckerCats",
        "cutecats",
        "catreactiongifs",
        "kitty",
        "cat",
        "kitties",
        "IllegallySmolCats",
        "SeniorCats",
        "wetcats",
        "catpics",
        "catpictures",
        "kittengifs",
        "CatGifs",
        "SupermodelCats",
        "blurrypicturesofcats",
    ],
    reptiles: [
        "BeardedDragons",
        "Chameleons",
        "iguanas",
        "leopardgeckos",
        "snakes",
        "Tortoises",
        "TurtleFacts",
        "CrestedGecko",
        "geckos",
        "herpetology",
        "Lizards",
        "MonitorLizard",
        "reptiles",
        "snakeswearinghats",
        "Sneks",
        "turtles",
        "ballpython",
        "GeckoSmiles",
        "SnakesWithHats",
        "Tortoises",
        "turtle",
        "turtlesonalligators",
    ],
    birds: [
        "ALLTHEBIRDS",
        "BackYardChickens",
        "birding",
        "birdpics",
        "birdsofprey",
        "duck",
        "geese",
        "Owls",
        "PetDoves",
        "birdwatching",
        "chickens",
        "Conures",
        "DivorcedBirds",
        "Finches",
        "parrots",
        "penguin",
        "babyduckgifs",
        "BirdPhotography",
        "BirdsBeingDicks",
        "birdswitharms",
        "budgies",
        "cockatiel",
        "crows",
        "hummingbirds",
        "PartyParrot",
        "ShoebillStorks",
    ],
    everything: [
        "AnimalsBeingBros",
        "babyelephantgifs",
        "AnimalsBeingFunny",
        "AnimalsInHats",
        "animalssmiling",
        "hitmanimals",
        "petsinwigs",
        "AnimalShaming",
        "AnimalsBeingDerps",
        "AnimalsStuckInThings",
        "AnimalsWithoutNecks",
        "Delightfullychubby",
        "FunnyAnimals",
        "tinyanimalsonfingers",
        "AnimalTextGifs",
        "AnimalsBeingJerks",
        "AnimalsFailing",
        "sittinglikehumans",
        "StoppedWorking",
        "TrollingAnimals",
        "aww",
        "CatsAndDogsBFF",
        "Sleepinganimals",
        "unlikelyfriends",
        "ALLTHEANIMALS",
        "awwakeup",
        "bigboye",
        "hardcoreaww",
        "Teefers",
        "brushybrushy",
        "NatureIsFuckingLit",
        "Pet_Renaissance",
        "TinyUnits",
    ],
};

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
    constructor(props) {
        super(props);
        this.state = {
            mediaObjects: [], // array of objects
            currentPage: "homePage",
            categories: {},
            heartedMedia: [],
            navData: {
                isHeartHovered: false,
                isHomeHovered: false,
                handleMouseEnterHome: this.handleMouseEnterHome,
                handleMouseLeaveHome: this.handleMouseLeaveHome,
                handleMouseEnterHeart: this.handleMouseEnterHeart,
                handleMouseLeaveHeart: this.handleMouseLeaveHeart,
                handleClickHome: this.handleClickHome,
                handleClickHeart: this.handleClickHeart,
            },
        };
    }
    // this
    componentDidMount() {
        // this.setState({ categories: this.getInitialSubredditData() }, () => {
        //     this.fetchBasedOnWeights();
        // });
    }

    // NavBar
    handleMouseEnterHome = (e) => {
        this.setState((prevState) => {
            const newNavData = cloneDeep(prevState.navData);
            newNavData.isHomeHovered = true;
            return {
                navData: newNavData,
            };
        });
    };
    handleMouseLeaveHome = (e) => {
        this.setState((prevState) => {
            const newNavData = cloneDeep(prevState.navData);
            newNavData.isHomeHovered = false;
            return {
                navData: newNavData,
            };
        });
    };
    handleClickHome = (e) => {
        this.setState({ mediaObjects: [], currentPage: "homePage" });
    };
    handleMouseEnterHeart = (e) => {
        this.setState((prevState) => {
            const newNavData = cloneDeep(prevState.navData);
            newNavData.isHeartHovered = true;
            return {
                navData: newNavData,
            };
        });
    };
    handleMouseLeaveHeart = (e) => {
        this.setState((prevState) => {
            const newNavData = cloneDeep(prevState.navData);
            newNavData.isHeartHovered = false;
            return {
                navData: newNavData,
            };
        });
    };
    handleClickHeart = (e) => {
        const newMediaObjects = cloneDeep(this.state.heartedMedia);
        this.setState(
            {
                mediaObjects: [],
                currentPage: "heartedPage",
                mediaObjects: newMediaObjects,
            },
            () => {
                console.log(this.state);
            }
        );
    };

    // HomePage
    handleCategoryClick = (e) => {
        console.log(e.target.value);
        this.setState(
            {
                categories: this.getInitialSubredditData(),
                mediaObjects: [],
                currentPage: `${e.target.value}`,
            },
            () => {
                // console.log(this.state);
                this.fetchBasedOnWeights();
            }
        );
    };

    // this, Media
    getInitialSubredditData = () => {
        const newCategories = cloneDeep(this.state.categories);
        for (const category in subreddits) {
            newCategories[category] = {};
            for (const name of subreddits[category]) {
                newCategories[category][name] = {
                    weight: 1,
                    normalizedWeight: undefined,
                    afterId: undefined,
                };
            }
        }

        const normalizedInitialData = this.getNormalizedSubredditData(
            newCategories
        );

        return normalizedInitialData;
    };
    getNormalizedSubredditData = (categories) => {
        for (const categoryName in categories) {
            let sum = 0;
            for (const subredditName in categories[categoryName]) {
                const subredditObj = categories[categoryName][subredditName];
                sum += subredditObj.weight;
            }

            for (const subredditName in categories[categoryName]) {
                const subredditObj = categories[categoryName][subredditName];
                subredditObj.normalizedWeight = subredditObj.weight / sum;
            }
        }

        return categories;
    };
    fetchBasedOnWeights = () => {
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

        // console.log(subredditsToFetchFrom);

        for (const name in subredditsToFetchFrom) {
            this.fetchImageFromSubreddit(
                name,
                subredditsToFetchFrom[name].numImages
            );
        }
    };
    fetchImageFromSubreddit = (name, numImages) => {
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
                            mediaObject.type = "gif";
                            mediaObject.subreddit = `${postObject.data.subreddit}`;
                            mediaObject.url = `${postObject.data.secure_media.oembed.thumbnail_url}`; // compressed gif, can get uncompressed version
                            mediaObject.height = `${postObject.data.secure_media.oembed.thumbnail_height}`;
                            mediaObject.width = `${postObject.data.secure_media.oembed.thumbnail_width}`;

                            break;
                        case "hosted:video": // reddit video
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

                newCategories[this.state.currentPage][name].afterId = afterId;

                this.setState({
                    mediaObjects: newMediaObjects,
                    categories: newCategories,
                });
            })

            .catch((e) => {
                if (e.message === "duplicate after ids found") {
                } else if (e.message === "duplicate media ids found") {
                } else {
                    console.error("unknown error in fetchImageFromSubreddit:"); // cont here
                    console.log(e);
                    console.log(e.message === "duplicate media ids found");
                }
            });
    };
    handleClickMediaHeart = (mediaObject) => {
        if (this.state.currentPage === "heartedPage") {
            const newMediaObjects = cloneDeep(this.state.mediaObjects);

            newMediaObjects.splice(mediaObject.index, 1);

            this.setState({ mediaObjects: newMediaObjects });
        } else {
            const newMediaObjects = cloneDeep(this.state.mediaObjects);
            const subredditName = mediaObject.subreddit;
            let newCategories = cloneDeep(this.state.categories);

            // update isHeartClicked of this.state.mediaObjects
            // update weighting of this.state.categories
            if (this.state.mediaObjects[mediaObject.index].isHeartClicked) {
                // should unheart
                newMediaObjects[mediaObject.index].isHeartClicked = false;
                newCategories[this.state.currentPage][
                    subredditName
                ].weight -= 10;
            } else {
                // should heart
                newMediaObjects[mediaObject.index].isHeartClicked = true;
                newCategories[this.state.currentPage][
                    subredditName
                ].weight += 10;
            }

            newCategories = this.getNormalizedSubredditData(newCategories);

            // update heartedMedia by copying the updated object in newMediaObjects
            const newHeartedMedia = cloneDeep(this.state.heartedMedia);
            newHeartedMedia.push(newMediaObjects[mediaObject.index]);
            console.log(
                "handleClickMediaHeart -> newHeartedMedia",
                newHeartedMedia
            );

            this.setState(
                {
                    mediaObjects: newMediaObjects,
                    categories: newCategories,
                    heartedMedia: newHeartedMedia,
                },
                () => {}
            );
        }
    };

    render() {
        const renderMasonryImages = () => {
            if (this.state.currentPage !== "homePage") {
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
                                    handleHeartClick={
                                        this.handleClickMediaHeart
                                    }
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
                                    value="reptiles"
                                    onClick={this.handleCategoryClick}
                                >
                                    Reptiles
                                </Button>
                                <Button
                                    value="birds"
                                    onClick={this.handleCategoryClick}
                                >
                                    Birds
                                </Button>
                                <Button
                                    value="everything"
                                    onClick={this.handleCategoryClick}
                                >
                                    Everything
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
                <NavBar {...this.state.navData}></NavBar>
                <div style={{ marginLeft: "100px" }}>
                    <Container className="fluid .mx-0">
                        <Row>
                            {/* fixed column here */}
                            <Col>
                                {renderMasonryImages()}
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
