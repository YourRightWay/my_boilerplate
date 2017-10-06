import React from 'react'
import * as d3 from "d3";
import * as shapes from "d3-shape";
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { easeLinear } from 'd3-ease'

import ChartAngle from './chart-angle'

class ReactChart extends React.Component {
    generatePathFromD3(or, ir, sa, ea) {
        this.ir = ir;
        this.or = or;
        this.sa = sa;
        this.ea = ea;
        return shapes.arc().innerRadius(this.ir).outerRadius(this.or).startAngle(this.sa)
            .endAngle(this.ea);
    }
    render() {
        const { width, height } = this.props;
        const outerRadius = Math.max(width, height) / 3;
        const innerRadius = outerRadius - 4;
        
        let arc = this.generatePathFromD3(innerRadius, outerRadius, 0, (67 * Math.PI)/180);
        let arc2 = this.generatePathFromD3(innerRadius, outerRadius, (67 * Math.PI)/180, Math.PI);

        let x = Math.cos(30)
        let y = Math.sin(30)

        console.log(x, y)


        return (
            <svg width={width} height={height}>
                <g className="chart-group" transform={`translate(${width / 2},${height / 2})`}>
                    <ChartAngle color="#434343" arc={arc()} />
                    <ChartAngle color="red" arc={arc2()} />

                    <path d="M0,0 L2,0" fill="none" stroke="#fff"/>
                    <line x1="0" y1="0" x2={x} y2={y} stroke="green" strokeWidth="4" />
                </g>
            </svg>
        );
    }
}

let fakeData = {
    description: 'All therapeutic',
    investigation: [
        {
            angle: 240,
            colorSegment: '#d13a33',
            colorSubSegment: '#a9301b',
            colorSubSegmentDarken: '#8c1f1a',
            label: 'RISK'
        },
        {
            angle: 60,
            colorSegment: '#fcb13a',
            colorSubSegment: '#fcb13a',
            label: 'WARNING'
        },
        {
            angle: 60,
            colorSegment: '#2bb874',
            colorSubSegment: '#2bb874',
            label: 'DONE'
        }
    ]
};

ReactChart.defaultProps = {
    data: fakeData
};

export default ReactChart