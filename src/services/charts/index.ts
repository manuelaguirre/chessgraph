import { SVGDimensions, RatingDataPoint } from "../../types"
import * as d3 from "d3"

export const draw = (dataset: RatingDataPoint[], dimensions: SVGDimensions, chart: HTMLElement) => {
    {
        const init = () => {
            //We are accessing the div with the id chart using d3's select method and appending svg
            const svg = d3
                .select("#chart")
                .append("svg")
                .attr("width", dimensions.width)
                .attr("height", dimensions.height)
                .append("g")
                .style(
                    "transform",
                    `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
                );

            const xDomain = d3.extent<RatingDataPoint, Date>(dataset, datum => datum.date)
            const yDomain = d3.extent<RatingDataPoint, number>(dataset, datum => datum.rating)

            if (xDomain[0] && yDomain[0]) {
                const xScale = d3
                    .scaleTime()
                    .domain(xDomain)
                    .range([0, dimensions.width]);

                const yScale = d3
                    .scaleLinear()
                    .domain(yDomain)
                    .range([0, dimensions.height]);


                const line = d3
                    .line<RatingDataPoint>()
                    .x(datum => xScale(datum.date))
                    .y(datum => yScale(datum.rating))

                svg
                    .append("path")
                    .attr("d", line(dataset))
                    .attr("fill", "none")
                    .attr("stroke", "#222")
                    .attr("stroke-width", 1);
            };
        };
        init()
    }
}