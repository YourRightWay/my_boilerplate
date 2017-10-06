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

            return (
                <path key={i} d={arc()} fill={colors[i]} />
            );
        });
    }
    render() {
        return (
            <svg width="500" height="500">
                <g transform={`translate(${500 / 2},${500 / 2})`}>
                    {this.renderChart()}
                </g>
            </svg>
        );
    }
}

render(
    <App />,
    document.getElementById('root')
);







