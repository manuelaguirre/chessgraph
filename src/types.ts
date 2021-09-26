export type RatingDataPoint = {
    date: Date;
    rating: number;
}

export type LichessRatingObject = [
    year: number,
    month: number,
    day: number,
    rating: number,
]

export type SVGDimensions = {
    height: number,
    width: number,
    margin: {
        top: number,
        right: number,
        bottom: number,
        left: number,
    },
};
