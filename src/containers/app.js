import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class App extends React.Component {
    componentDidMount() {
        
        let width = 500;
        let height = 500;
        let ir = 100;
        let or = 140;

        var arc = d3.arc()
            .innerRadius(ir)
            .outerRadius(or)
            .startAngle(0)
            .endAngle(Math.PI/2);

        var arc2 = d3.arc()
            .innerRadius(ir)
            .outerRadius(or)
            .startAngle(Math.PI/2)
            .endAngle(Math.PI*2);

        var arc3 = d3.arc()
            .innerRadius(150)
            .outerRadius(160)
            .startAngle(0)
            .endAngle(Math.PI/2);

        var arc4 = d3.arc()
            .innerRadius(170)
            .outerRadius(180)
            .startAngle(0)
            .endAngle(Math.PI/3);
        
        var svg = d3.select(this.node),
            g = svg.append("g").attr("transform", `translate(${width/2} ${height/2}) rotate(45 0 0)`);
        
        g.append('path').transition().duration(750).attr('d', arc)
        g.append('path').attr('d', arc2).attr('fill', '#e3e3e4')
        g.append('path').attr('d', arc3).attr('fill', '#000')
        g.append('path').attr('d', arc4).attr('fill', '#000')

    }
    render() {
        return (
            <svg ref={(node) => { this.node = node }} height="500" width="500">
            </svg>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;