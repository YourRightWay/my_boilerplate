import React from 'react'
import * as d3 from "d3";
import { select } from 'd3-selection';

export default class Bar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            y: 0,
            height: 0
        }
    }

    componentDidMount() {
        select(this.node)
            .attr("height", 450)
            .attr("width", this.props.width)
            .attr("y", 0)
            .attr("height", 0)
            .attr("y", 450)
            .transition().duration(1500)
            .attr("height", this.props.height)
            .attr("y", 450 - this.props.height)

    }

    render() {
        let style = {
            fill: "steelblue"
        }

        return(
            <g>
                <rect
                    ref={(node) => this.node = node}
                    className="bar"
                    style={style}
                    x={this.props.x}
                    width={this.props.width}
                    height={this.state.height} />
            </g>
        )
    }
}
