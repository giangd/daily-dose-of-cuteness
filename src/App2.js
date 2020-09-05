import React from "react";
import Media from "./Components/Media";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Masonry from "react-masonry-css";

const MasonryStyles = styled.div`
    /* whole grid */
    .masonry-grid {
        display: -webkit-box; /* Not needed if autoprefixing */
        display: -ms-flexbox; /* Not needed if autoprefixing */
        display: flex;
        width: 75vw; /* 100vw * 0.75 - 17px */
        /* position: absolute; */
        /* margin-left: calc((100vw - 75vw) / 2 - 17px); */
        margin: 0 auto;
    }

    /* grid columns */
    .masonry-grid_column {
        background-clip: padding-box;
    }

    /* individual items */
    .masonry-grid_column > * {
    }
`;

export default function (props) {
    return (
        <>
            <InfiniteScroll
                dataLength={props.mediaObjects.length}
                next={props.fetchBasedOnWeights}
                hasMore={true}
                style={{ overflow: "hidden" }}
            ></InfiniteScroll>

            <MasonryStyles>
                <Masonry
                    breakpointCols={3}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {props.mediaObjects.map((mediaObject, index) => {
                        return (
                            <Media
                                {...mediaObject}
                                handleHeartClick={props.handleHeartClick}
                                index={index}
                                key={`${mediaObject.id}`}
                            />
                        );
                    })}
                </Masonry>
            </MasonryStyles>
        </>
    );
}
