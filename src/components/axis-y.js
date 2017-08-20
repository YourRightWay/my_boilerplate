import React from 'react'
import * as d3 from "d3";

export default class YAxis extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let style = {
            stroke: "steelblue",
            strokeWidth: "1px"
        }

        let textStyle = {
            fontSize: "0.8em",
            fill: "steelblue",
            textAnchor: "end"
        }

        //D3 mathy bits
        let ticks = d3.range(0, this.props.end, (this.props.end / this.props.labels.length))
        let percentage = d3.format(".0%")

        let lines = []
        ticks.forEach((tick, index) => {
            lines.push(
                <line
                    style={style}
                    key={index}
                    y1={tick}
                    x1={this.props.y}
                    y2={tick}
                    x2={this.props.y - 4}
                />
            )
        })

        let columnLables = []
        ticks.forEach((tick, index) => {
            columnLables.push(
                <text style={ textStyle }
                      key={index}
                      y={tick + 6}
                      x={this.props.y - 6}
                      fontFamily="Verdana" >
                    {percentage(this.props.labels[index])}
                </text>
            )
        })
  

        return(
            <g>
                <g className="y_labels" transform={`translate(${-5},${17})`}>
                    <line x1={this.props.y}
                          y1={this.props.start}
                          y2={this.props.end}
                          x2={this.props.y}
                          style={ style } />
                </g>
                <g className="y_labels" transform={`translate(${-5},${51})`}>
                    { columnLables }
                    { lines }
                </g>
            </g>
        )
    }
}
