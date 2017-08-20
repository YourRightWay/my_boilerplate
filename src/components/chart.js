import React from 'react'
import * as d3 from "d3";
import * as shape from "d3-shape";
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { easeLinear } from 'd3-ease'

import XAxis from './axis-x'
import YAxis from './axis-y'
import Bar from './bar'


class ReactChart extends React.Component {

    render() {
        let data = this.props.data

        let margin = {top: 20, right: 20, bottom: 30, left: 45},
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        let letters = data.map((d) => d.letter)
        
        //D3 mathy bits
        let ticks = d3.range(0, width, (width / data.length));
        
        let x = d3.scaleOrdinal()
            .domain(letters)
            .range(ticks)

        let y = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d.frequency)])
            .range([height, 0])

        let bars = []
        let bottom = 450

        data.forEach((datum, index) => {
            bars.push(
                <Bar
                    key={index}
                    x={x(datum.letter)}
                    y={bottom - 6 - (height - y(datum.frequency))}
                    width={20}
                    height={height - y(datum.frequency)}/>
            )
        })

        console.log('render', this.props)
        

        return (
            <svg width={this.props.width} height={this.props.height}>
                <YAxis y={40} 
                       labels={y.ticks().reverse()} 
                       start={15} 
                       end={height} />

                <g className="chart"
                   transform={`translate(${margin.left},${margin.top})`}>
                    { bars }
                    <XAxis x={ bottom }
                           labels={letters}
                           start={0}
                           end={width}/>
                </g>
            </svg>
        );
    }

}


export default ReactChart