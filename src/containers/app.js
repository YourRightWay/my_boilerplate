import React from 'react';
import PropTypes from 'prop-types';

import Chart from '../components/chart';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                    angle: 23,
                    color: "#ff4643",
                    text: 'Risk'
                },
                {
                    angle: 56,
                    color: "#ff7c40",
                    text: 'Warning'
                },
                {
                    angle: 27,
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
                      height={500}
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
