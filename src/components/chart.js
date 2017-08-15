import React from 'react';
import * as d3 from "d3";
import { select } from 'd3-selection'
import { map } from 'd3-collection'
import { transition } from 'd3-transition'
import { easeLinear } from 'd3-ease'

export default class Chart extends React.Component {
    componentDidMount() {
        this.makeChart ();
    }

    componentDidUpdate() {
        this.makeChart ();
    }

    makeChart () {
        let node = this.node,
            {width, height, data, padAngle, radius, duration, delay, startScale} = this.props,
            outerRadius = radius,
            innerRadius = outerRadius / 4,
            timing = transition().duration(750).ease(easeLinear),
            pie = d3.pie().padAngle(padAngle),
            arc = d3.arc().padRadius(outerRadius).innerRadius(innerRadius).padAngle(padAngle),
            maps = map(data, (d) => d.angle),
            svg = select(node),
            g = svg.append("g")
                .attr("transform", `translate(${width / 2},${height / 2}) scale(${startScale})`);

        g.transition(timing)
            .duration(duration)
            .delay(delay)
            .attr("transform", `translate(${width/2},${height/2}) scale(1)`)

        let selectionGroup = g.selectAll("g")
            .data(pie(maps.keys()))
            .enter().append("g")
            .each(function (d, i) {
                select(this).style('opacity', 0).transition(timing).style('opacity', 1)
                d.outerRadius = outerRadius - d.data / 10;
            })
            .attr("d", arc)
            .attr('fill', (d, i) => data[i].color);

        selectionGroup.append("path")
            .attr("d", arc)
            .attr('fill', (d, i) => data[i].color)
            .on("mouseover", arcTween(outerRadius, 0))
            .on("mouseout", arcTween(outerRadius - 20, 150));

        selectionGroup.append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("fill", "#fff")
            .append('tspan')
            .attr("font-family", "Arial")
            .attr("font-size", 14)
            .attr("text-transform", "uppercase")
            .text((d, i) => data[i].text);

        function arcTween(outerRadius, delay) {
            return function() {
                d3.select(this).transition().delay(delay).attrTween("d", function(d) {
                    var i = d3.interpolate(d.outerRadius, outerRadius - d.data/20);
                    return function(t) {
                        d.outerRadius = i(t);
                        return arc(d);
                    };
                });
            };
        }
    }

    render() {
        return (
            <svg ref={node => this.node = node}
                 width={this.props.width} height={this.props.width}>
            </svg>
        );
    }
}