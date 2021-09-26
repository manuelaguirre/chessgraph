import { RatingDataPoint, LichessRatingObject } from "../../types"

const token = import.meta.env.VITE_LICHESS_TOKEN

export const getDataPoints = async (): Promise<RatingDataPoint[]> => {
    return await fetch("https://lichess.org/api/user/volantero/rating-history",)
        .then(response => response.json())
        .then(res => res[1].points)
        .then(points => points.map((element: LichessRatingObject) => adaptRating(element)))
}

function adaptRating(datum: LichessRatingObject): RatingDataPoint {
    return {
        date: new Date(datum[0], datum[1], datum[2]),
        rating: datum[3]
    }
}