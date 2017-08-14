import React from 'react';
import * as d3 from "d3";

export default class Chart extends React.Component {
    componentDidMount() {
        let {width, height, data, uniqueClass, radius} = this.props;

        var outerRadius = radius,
            innerRadius = outerRadius / 4,
            padAngle = .02;

        let map = d3.map(data, (d) => d.angle);
        var pie = d3.pie().padAngle(padAngle);
        var t = d3.transition().duration(750).ease(d3.easeLinear);


        var arc = d3.arc()
            .padRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(padAngle);


        var svg = d3.select(`.${uniqueClass}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        var cnt = svg.append("g")
            .attr("transform", `translate(${width/2},${height/2}) scale(0.85)`);
        cnt.transition(t).duration(450)
            .attr("transform", `translate(${width/2},${height/2}) scale(1)`);

        let g = cnt.selectAll("g")
            .data(pie(map.keys()))
            .enter().append("g")
            .each(function(d, i) {
                d3.select(this).style('opacity', 0).transition(t).style('opacity', 1)
                d.outerRadius = outerRadius - d.data/10;
            })
            .attr("d", arc)
            .attr('fill', (d, i) => data[i].color)

        g.append("path")
            .attr("d", arc)
            .attr('fill', (d, i) => data[i].color)
            .on("mouseover", arcTween(outerRadius, 0))
            .on("mouseout", arcTween(outerRadius - 20, 150));

        g.append('text')
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
            <div className={`chart-cnt ${this.props.uniqueClass}`}></div>
        );
    }
}