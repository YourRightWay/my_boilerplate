import React from 'react';
import PropTypes from 'prop-types';

import Chart from '../components/chart';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                    angle: 120,
                    color: "#ff4643",
                    text: 'Risk'
                },
                {
                    angle: 200,
                    color: "#ff7c40",
                    text: 'Warning'
                },
                {
                    angle: 40,
                    color: "#2ca02c",
                    text: 'Done'
                }
            ]
        }
    }

    render() {
        return (
            <div>
               <Chart width={500}
                      uniqueClass="chart-cnt1"
                      height={500}
                      radius={200}
                      data={this.state.data}/>

                <Chart width={400}
                       uniqueClass="chart-cnt2"
                       radius={150}
                       height={400}
                       data={this.state.data}/>
                <Chart width={300}
                       radius={100}
                       uniqueClass="chart-cnt3"
                       height={300}
                       data={this.state.data}/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;
