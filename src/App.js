import React from "react";
import Heading from "./Components/Heading";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import cloneDeep from "lodash/cloneDeep";
import MasonryImages from "./Components/MasonryImages";

import { createGlobalStyle } from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import HomePage from "./Components/HomePage";

import NavBar from "./Components/NavBar";
import Alert from "react-bootstrap/Alert";
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
            isLoading: undefined,
            mediaObjects: [], // array of objects
            currentPage: "homePage",
            categories: {},
            heartedMedia: [],
            alertText: undefined,
            navData: {
                isHeartHovered: false,
                isHomeHovered: false,
                isGithubHovered: false,
                handleMouseEnterHome: this.handleMouseEnterHome,
                handleMouseLeaveHome: this.handleMouseLeaveHome,
                handleMouseEnterHeart: this.handleMouseEnterHeart,
                handleMouseLeaveHeart: this.handleMouseLeaveHeart,
                handleMouseEnterGithub: this.handleMouseEnterGithub,
                handleMouseLeaveGithub: this.handleMouseLeaveGithub,
                handleClickHome: this.handleClickHome,
                handleClickHeart: this.handleClickHeart,
                handleClickGithub: this.handleClickGithub,
            },
        };
    }
    // this

    componentDidMount() {
        if (localStorage.getItem("heartedMedia") !== null) {
            this.setState({
                heartedMedia: JSON.parse(localStorage["heartedMedia"]),
            });
        }
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
                currentPage: "heartedPage",
                mediaObjects: newMediaObjects,
            },
            () => {}
        );
    };

    handleMouseEnterGithub = (e) => {
        this.setState((prevState) => {
            const newNavData = cloneDeep(prevState.navData);
            newNavData.isGithubHovered = true;
            return {
                navData: newNavData,
            };
        });
    };
    handleMouseLeaveGithub = (e) => {
        this.setState((prevState) => {
            const newNavData = cloneDeep(prevState.navData);
            newNavData.isGithubHovered = false;
            return {
                navData: newNavData,
            };
        });
    };
    handleClickGithub = (e) => {
        window.open(
            "https://github.com/giangd/daily-dose-of-cuteness",
            "_blank"
        );
    };

    // HomePage
    handleCategoryClick = (e) => {
        this.setState(
            {
                categories: this.getInitialSubredditData(),
                mediaObjects: [],
                currentPage: `${e.target.value}`,
                isLoading: true,
            },
            () => {
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
    fetchBasedOnWeights = async () => {
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

        for (const name in subredditsToFetchFrom) {
            await this.fetchImageFromSubreddit(
                name,
                subredditsToFetchFrom[name].numImages
            );
        }
        this.setState({ isLoading: false });
    };
    fetchImageFromSubreddit = async (name, numImages) => {
        const config = {
            crossdomain: true,
        };

        const apiUrl = "https://polar-escarpment-41746.herokuapp.com/api";
        const after = this.state.categories[this.state.currentPage][name]
            .afterId;

        try {
            const {
                data: { afterId, mediaObjects },
            } = await axios.get(
                `${apiUrl}/${name}/${numImages}/${after}`,
                config
            );

            // perform checks
            // if any of the subreddits have this afterId, throw error
            for (const name in this.state.categories[this.state.currentPage]) {
                if (
                    this.state.categories[this.state.currentPage][name]
                        .afterId === afterId
                ) {
                    throw new Error("duplicate after ids found");
                }
            }

            // if any of the mediaObjects have this postId, throw error
            for (const mediaObject of mediaObjects) {
                for (const stateMediaObject of this.state.mediaObjects) {
                    if (stateMediaObject.id === `${mediaObject.id}`) {
                        throw new Error("duplicate media ids found");
                    }
                }
            }

            // no duplicates ids or afterId's, update state

            const newMediaObjects = cloneDeep(this.state.mediaObjects).concat(
                mediaObjects
            );

            // update subreddit[index].afterId
            const newCategories = cloneDeep(this.state.categories);
            newCategories[this.state.currentPage][name].afterId = afterId;

            this.setState({
                mediaObjects: newMediaObjects,
                categories: newCategories,
            });
        } catch (err) {
            if (err.message === "duplicate after ids found") {
                // console.log("duplicate afterId's gracefully handled");
            } else if (err.message === "duplicate media ids found") {
                // console.log("duplicate media id gracefully handled");
            } else {
                // console.error("unknown error in fetchImageFromSubreddit:");
                // console.log(err);
            }
        }
    };
    handleClickMediaHeart = (mediaObject) => {
        if (this.state.currentPage === "heartedPage") {
            const newMediaObjects = cloneDeep(this.state.mediaObjects);
            newMediaObjects.splice(mediaObject.index, 1);

            localStorage.setItem(
                "heartedMedia",
                JSON.stringify(newMediaObjects)
            );
            this.setState({ mediaObjects: newMediaObjects });
        } else {
            const newMediaObjects = cloneDeep(this.state.mediaObjects);
            const subredditName = mediaObject.subreddit;
            let newCategories = cloneDeep(this.state.categories);

            // update isHeartClicked
            // update weighting
            // update heartedMedia
            let newHeartedMedia = cloneDeep(this.state.heartedMedia);
            let moreOrLessText;
            if (this.state.mediaObjects[mediaObject.index].isHeartClicked) {
                // should unheart
                newMediaObjects[mediaObject.index].isHeartClicked = false;

                newHeartedMedia = newHeartedMedia.filter((element) => {
                    return element.id !== newMediaObjects[mediaObject.index].id;
                });

                newCategories[this.state.currentPage][
                    subredditName
                ].weight -= 10;

                moreOrLessText = "less";
            } else {
                // should heart
                newMediaObjects[mediaObject.index].isHeartClicked = true;

                newHeartedMedia.push(newMediaObjects[mediaObject.index]);

                newCategories[this.state.currentPage][
                    subredditName
                ].weight += 10;

                moreOrLessText = "more";
            }

            const oldPercent = Math.round(
                newCategories[this.state.currentPage][subredditName]
                    .normalizedWeight * 100
            );
            newCategories = this.getNormalizedSubredditData(newCategories);
            const newPercent = Math.round(
                newCategories[this.state.currentPage][subredditName]
                    .normalizedWeight * 100
            );

            const newAlertText = `You'll see ${moreOrLessText} things from ${subredditName}! ${oldPercent}% ➜ ${newPercent}%`;

            localStorage.setItem(
                "heartedMedia",
                JSON.stringify(newHeartedMedia)
            );

            this.setState(
                {
                    mediaObjects: newMediaObjects,
                    categories: newCategories,
                    heartedMedia: newHeartedMedia,
                    alertText: newAlertText,
                    showAlert: true,
                },
                () => {
                    setTimeout(() => {
                        if (this.state.alertText === newAlertText) {
                            this.setState({ showAlert: false });
                        }
                    }, 3000);
                }
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
                                <Heading
                                    currentPage={this.state.currentPage}
                                ></Heading>
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
                    <HomePage
                        handleCategoryClick={this.handleCategoryClick}
                    ></HomePage>
                );
            }
        };

        return (
            <div className="app">
                <GlobalStyle />
                {this.state.showAlert && (
                    <Alert
                        variant="primary"
                        className="text-center"
                        style={{
                            position: "fixed",
                            left: "0px",
                            right: "0px",
                            zIndex: 1,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        {this.state.alertText}
                    </Alert>
                )}

                <NavBar {...this.state.navData}></NavBar>
                <div style={{ marginLeft: "80px", padding: "0 50px 0 50px" }}>
                    <Container fluid>
                        <Row>
                            <Col>
                                {renderMasonryImages()}
                                {renderHomePage()}
                                {this.state.isLoading ? (
                                    <h1>LOADING...</h1>
                                ) : null}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default App;
