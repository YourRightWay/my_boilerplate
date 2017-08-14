import React from 'react';
import * as d3 from "d3";

export default class Chart extends React.Component {
    componentDidMount() {
        let {width, height} = this.props;
        let svg = d3.select('.chart-cnt')
            .append('svg')
            .attr('width', width)
            .attr('height', height),
            _this = this;

        let g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 4)
            .padAngle(0);

        let map = d3.map(_this.props.data, (d) => d.angle);

        let pie = d3.pie().sort(null);

        let arcs = g.selectAll(".arc")
            .data(pie(map.keys()))
            .enter()
            .append('g')
            .attr('class', '.arc')
            .attr('fill', (d, i) => _this.props.data[i].color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.2)

        arcs.append('path')
            .attr('d', arc)
            .attr('class', (d, i) => `path-${_this.props.data[i].text}`)
            .on('mouseover', function (d, i) {})
            .on('mouseout', function (d, i) {})

        arcs.append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .style("stroke", "none")
            .attr("fill", "#fff")
            .append('tspan')
            .attr("font-family", "Arial")
            .attr("font-size", 14)
            .attr("text-transform", "uppercase")
            .text((d, i) => _this.props.data[i].text);
    }
    render() {
        return (
            <div className="chart-cnt"></div>
        );
    }
}