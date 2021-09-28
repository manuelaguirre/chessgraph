import { RatingDataPoint } from "../../types"
import * as d3 from "d3"

export const draw = (dataset: RatingDataPoint[]) => {
    {
        const margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
        }

        const viewBox = {
            minX: 50,
            minY: 0,
            width: 800,
            height: 600
        }
        const fromDate = new Date(2021, 1, 15)

        const svg = d3
            .select("#chart")
            .append("svg")
            .attr("viewBox", `${-viewBox.minX} 0 ${viewBox.width} ${viewBox.height}`)
            .append("g")

        const xDomain = [fromDate, new Date(Date.now())] as const
        const yDomain = [1000, 1400]

        const xScale = d3
            .scaleTime()
            .domain(xDomain)
            .range([0, viewBox.width]);

        const yScale = d3
            .scaleLinear()
            .domain(yDomain)
            .range([viewBox.height - margin.bottom, margin.top]);

        svg
            .selectAll("circle")
            .data(dataset)
            .join("circle")
            .attr("r", "1px")
            .attr("cx", datum => xScale(datum.date))
            .attr("cy", datum => yScale(datum.rating))
            .attr("stroke", "#4EBBBB")
            .attr("stroke-width", 1)

        svg.selectAll("rect")
            .data(dataset)
            .join("rect")
            .attr("x", datum => xScale(datum.date))
            .attr("width", "1px")
            .attr("fill", "transparent")
            .attr("height", viewBox.height)
            .attr("data-pos", datum => xScale(datum.date))

        const line = d3
            .line<RatingDataPoint>()
            .curve(d3.curveMonotoneX)
            .x(datum => xScale(datum.date))
            .y(datum => yScale(datum.rating))
            .defined((datum, index) => {
                return datum.date.getTime() >= fromDate.getTime()
            })

        svg
            .append("path")
            .attr("d", line(dataset))
            .attr("fill", "none")
            .attr("stroke", "#222")
            .attr("stroke-width", 1);

        const axis = d3
            .axisLeft(yScale)
            .ticks(3)
            .tickSize(1)


        svg.append("g")
            .call(axis)
            .style(
                "transform",
                `translate(${0}px, ${0}px)`
            )

    };

}