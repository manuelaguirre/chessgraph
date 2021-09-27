import { SVGDimensions, RatingDataPoint } from "../../types"
import * as d3 from "d3"

export const draw = (dataset: RatingDataPoint[], dimensions: SVGDimensions) => {
    {

        const { height, width, margin } = dimensions
        //We are accessing the div with the id chart using d3's select method and appending svg
        const svg = d3
            .select("#chart")
            .append("svg")
            // .attr("width", dimensions.width)
            // .attr("height", dimensions.height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            // .attr("preserveAspectRatio", "xMidYMin slice")
            .append("g")
            .style(
                "transform",
                `translate(${margin.left}px, ${margin.top}px)`
            )

        const xDomain = [new Date(2021, 2, 15), new Date(Date.now())]
        const yDomain = d3.extent<RatingDataPoint, number>(dataset, datum => datum.rating)

        if (xDomain[0] && yDomain[0]) {

            const xScale = d3
                .scaleTime()
                .domain(xDomain)
                .range([margin.left, width - margin.right]);

            const yScale = d3
                .scaleLinear()
                .domain(yDomain)
                .range([height - margin.bottom, margin.top]);

            svg
                .selectAll("circle")
                .data(dataset)
                .join("circle")
                .attr("r", "1px")
                .attr("cx", datum => xScale(datum.date))
                .attr("cy", datum => yScale(datum.rating))
                .attr("stroke", "#4EBBBB")
                .attr("stroke-width", 1)


            const handleMouseOver = (e: MouseEvent) => {
                console.log(e.pageX);
            }

            svg.selectAll("rect")
                .data(dataset)
                .join("rect")
                .attr("x", datum => xScale(datum.date))
                .attr("width", "1px")
                .attr("fill", "transparent")
                .attr("height", height)
                .on("mousemove", (e) => {
                    console.log(e.pageX)
                })


            const line = d3
                .line<RatingDataPoint>()
                .curve(d3.curveMonotoneX)
                .x(datum => xScale(datum.date))
                .y(datum => yScale(datum.rating))

            svg
                .append("path")
                .attr("d", line(dataset))
                .attr("fill", "none")
                .attr("stroke", "#222")
                .attr("stroke-width", 1);


        }
    };

}