import React from 'react';
import PropTypes from 'prop-types';

import Chart from '../components/chart';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {
                1: [
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
                ],
                2: [
                    {
                        angle: 60,
                        color: "#ff4643",
                        text: 'Risk'
                    },
                    {
                        angle: 140,
                        color: "#ff7c40",
                        text: 'Warning'
                    },
                    {
                        angle: 160,
                        color: "#2ca02c",
                        text: 'Done'
                    }
                ],
                3: [
                    {
                        angle: 310,
                        color: "#ff4643",
                        text: 'Risk'
                    },
                    {
                        angle: 40,
                        color: "#ff7c40",
                        text: 'Warning'
                    },
                    {
                        angle: 10,
                        color: "#2ca02c",
                        text: 'Done'
                    }
                ]
            }
        }
    }

    render() {
        let createCharts = Object.keys(this.state.data).map((data, index) => (
            <Chart width={400}
                   key={Math.random()}
                   height={400}
                   duration={450}
                   delay={150*index}
                   radius={150}
                   startScale={0.85}
                   padAngle={.02}
                   data={this.state.data[data]}/>
        ))

        return (
            <div>
                { createCharts }
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;
