import React from 'react';
import * as d3 from "d3";
import { select } from 'd3-selection'
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
            {width, height, data, padAngle, radius, duration, delay, startScale, innerRadiusDiff} = this.props,
            outerRadius = radius,
            innerRadius = outerRadius / innerRadiusDiff,
            timing = transition().duration(750).ease(easeLinear),
            pie = d3.pie().padAngle(padAngle).sort(null),
            arc = d3.arc().padRadius(outerRadius).innerRadius(innerRadius).padAngle(padAngle),
            svg = select(node),
            g = svg.append("g")
                .attr("transform", `translate(${width / 2},${height / 2}) scale(${startScale})`);

        g.append("text")
            .style("text-anchor", "middle")
            .attr("fill", "#fff")
            .append('tspan')
            .attr("font-family", "Arial")
            .attr("font-size", 14)
            .attr("text-transform", "uppercase")
            .text(data.description);

        g.transition(timing)
            .duration(duration)
            .delay(delay)
            .attr("transform", `translate(${width/2},${height/2}) scale(1)`)

        let selectionGroup = g.selectAll("g")
            .data(pie(Object.keys(data.investigation).map((key) => data.investigation[key].angle )))
            .enter().append("g")
            .each(function (d, i) {

                let label = data.investigation[i].label,
                    colorSubSegment = data.investigation[i].colorSubSegment,
                    colorSegmentDarken = data.investigation[i].colorSubSegmentDarken,
                    angle = data.investigation[i].angle

                select(this).style('opacity', 0).transition(timing).style('opacity', 1)
                generateCoverAngle(select(this), label, colorSubSegment, colorSegmentDarken, angle)

                d.outerRadius = outerRadius;
            })
            .attr("class", 'chart-g');

        selectionGroup.append("path")
            .attr("d", arc)
            .attr('fill', (d, i) => data.investigation[i].colorSegment)
            .on("mouseover", arcTween(outerRadius + 20, 0))
            .on("mouseout", arcTween(outerRadius, 150));

        selectionGroup.append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("fill", "#fff")
            .append('tspan')
            .attr("font-family", "Arial")
            .attr("font-size", 14)
            .attr("text-transform", "uppercase")
            .text((d, i) => data.investigation[i].label);

        function arcTween(outerRadius, delay) {
            return function() {
                d3.select(this).transition().delay(delay).attrTween("d", function(d) {
                    var i = d3.interpolate(d.outerRadius, outerRadius);
                    return function(t) {
                        d.outerRadius = i(t);
                        return arc(d);
                    };
                });
            };
        }

        function generateCoverAngle(el, label, colorSegment, colorSubSegment, angle) {

            Math.radians = function(degrees) {
                return degrees * Math.PI / 180;
            };

            let riskCustomArc = d3.arc()
                .startAngle((d) =>  d.startAngle)
                .endAngle((d) =>  d.endAngle )
                .innerRadius(radius + 6)
                .outerRadius(radius + 14);

            let riskCustomArcDarken = d3.arc()
                .startAngle((d) =>  d.startAngle)
                .endAngle((d) =>  d.endAngle )
                .innerRadius(radius + 18)
                .outerRadius(radius + 32);

            let warningCustomArc = d3.arc()
                .startAngle((d) =>  d.startAngle)
                .endAngle((d) =>  d.endAngle )
                .innerRadius(radius + 6)
                .outerRadius(radius + 14);

            let doneCustomArc = d3.arc()
                .startAngle((d) =>  d.startAngle)
                .endAngle((d) =>  d.endAngle )
                .innerRadius(radius + 12)
                .outerRadius(radius + 14);


            if(label === 'Risk') {
                el.append("path").attr("d", riskCustomArc).attr('fill', colorSegment);
                el.append("path").attr("d", riskCustomArcDarken).attr('fill', colorSubSegment);
            } else if(label === 'Warning') {
                el.append("path").attr("d", warningCustomArc).attr('fill', colorSegment);
            } else if(label === 'Done') {
                el.append("path").attr("d", doneCustomArc).attr('fill', colorSegment);
            }
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