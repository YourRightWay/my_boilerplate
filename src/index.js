import React, { Component } from 'react';
import { render } from 'react-dom';
import data from './fake.json'
import * as shapes from 'd3-shape';
const { studies } = data;

const deg = 360 / 25;
let franchise = {};
const colors = ['#43d334', '#555544', '#e3eedd', '#65aeae', '#3232aa', '#fafae3']

let counter = function makeCounter() {
    var count = 0;
    return function countUp(n) {
        return n ? count = n : ++count;
    }
}();

studies.reduce(function (acc, el, index) {
    acc.franchise === el.franchise ? franchise[acc.franchise] = counter() : counter(1);
    return el 
}, studies[0]);

const keys = Object.keys(franchise);

const degrees = keys.reduce(function (acc, el, index) {
    return acc.concat(acc[index] + franchise[keys[index]] * deg)
}, [0]);
degrees.shift();

console.log(degrees)


function generatePathFromD3(outerRadius, innerRadius, startAngle, endAngle) {
    return shapes
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);
}


class App extends React.Component {
    renderChart() {
        const pie = shapes.pie().sort(null);
        const dataFromD3 = pie(degrees);

        return dataFromD3.map((d, i) => {
            const arc = generatePathFromD3(150, 200, d.startAngle, d.endAngle);

            const centroid = arc.centroid(d);
            const middleAngle = Math.atan2(centroid[1], centroid[0]);
            const x = Math.cos(middleAngle) * 210;
            const y = Math.sin(middleAngle) * 210;

            // holder.append("text")
            //     .style("fill", "black")
            //     .style("font-size", "56px")
            //     .attr("dy", ".35em")
            //     .attr("text-anchor", "middle")
            //     .attr("transform", "translate(300,150) rotate(0)")
            //     .text("d3noob.org");
            
            return (
                <g key={i}>
                    <path d={arc()} fill={colors[i]} />
                    <line
                        x1={0}
                        y1={0}
                        x2={x}
                        y2={y}
                        strokeWidth="1"
                        stroke="#000" />
                    <text transform={`translate(${x},${y}) rotate(0)`} 
                          fill="#000"
                          fontSize="14px"
                          dy="0.35"
                          textAnchor="middle">
                        Hello 
                    </text>
                </g>
            );
        });
    }
    render() {
        const {h, w} = this.props;
        return (
            <svg width={w} height={h}>
                <g transform={`translate(${w / 2},${h / 2})`}>
                    {this.renderChart()}
                </g>
            </svg>
        );
    }
}

App.defaultProps = {
    w: 700,
    h: 700
}

render(
    <App />,
    document.getElementById('root')
);







