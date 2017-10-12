import React from 'react';
import PropTypes from 'prop-types';
import * as shapes from 'd3-shape';

export function mathRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function angleCoordinates(centerX, centerY, radius, angleInDegrees) {
    return {
        x: centerX + (radius * Math.cos(mathRadians(angleInDegrees - 90))),
        y: centerY + (radius * Math.sin(mathRadians(angleInDegrees - 90)))
    };
}

function generatePathFromD3(outerRadius, innerRadius, startAngle, endAngle, padAngle, padRadius) {
    return shapes
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .padAngle(padAngle)
        .padRadius(padRadius);
}

class App extends React.Component {
    render() {
        const { w, h, r, angle1, angle2 } = this.props;
        
        const a1 = {
            x: angleCoordinates(0, 0, r, angle1).x,
            y: angleCoordinates(0, 0, r, angle1).y,
        };

        const a2 = {
            x: angleCoordinates(0, 0, r, angle2).x,
            y: angleCoordinates(0, 0, r, angle2).y,
        };
        
        let cos = Math.cos(mathRadians(70));
        let a = 200 * 200 + 200 * 200;
        let b = (200 * 200) * 2;
        
        let result = Math.sqrt(a - b * cos)
        console.log(result);

        return (
            <svg width="500" height="500">
                <g transform={`translate(${w / 2}, ${h / 2})`}>
                    <circle r={r} cx={0} cy={0} strokeWidth="1" stroke="#000" fill="transparent" />
                    <line x1={0} y1={0} x2={a1.x} y2={a1.y} strokeWidth="1" stroke="#000" />
                    <line x1={0} y1={0} x2={a2.x} y2={a2.y} strokeWidth="1" stroke="#000" />
                    <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} strokeWidth="1" stroke="red" />
                </g>
            </svg>
        );
    }
}

App.defaultProps = {
    w: 500,
    h: 500,
    r: 200,
    angle1: 50,
    angle2: 120
};

App.propTypes = {
    children: PropTypes.element
};

export default App;