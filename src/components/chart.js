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
        let charts = [];
        const { width, height, data } = this.props;
        const outerRadius = Math.max(width, height) / 4;
        const self = this;
        const innerRadius = outerRadius / 1.4;
        let pie = shapes.pie().padAngle(0).sort(null);
        let dataFromD3 = pie(Object.keys(data.investigation).map((key) => data.investigation[key].angle));
        const tSpanStyle = { fontSize: 12, textTransform: 'uppercase' };
        
        dataFromD3.forEach((d, i) => {
            let arc = self.generatePathFromD3(innerRadius, outerRadius, d.startAngle, d.endAngle);

            charts.push(
                <ChartAngle
                    key={Math.random()}
                    color={data.investigation[i].colorSegment}
                    arc={arc()}>
                </ChartAngle>
            );
        });

        return (
            <svg preserveAspectRatio="xMidYMin" viewBox={`0 0 ${width} ${height}`}>
                <g className="chart-group" transform={`translate(${width / 2},${height / 2})`}>
                    { charts }
                    <text fill="#fff" x="0" y="0" textAnchor="middle" dy=".3em">
                        <tspan style={tSpanStyle}>
                           65%
                        </tspan>
                    </text>
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