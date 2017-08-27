import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import Chart from  '../components/chart'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="inner-container">
                    <div className="flex-container">
                        <div className="flex-item ">
                            <Chart width="280" height="350" />
                        </div>

                        <div className="flex-item flex-item--center">
                            
                        </div>

                        <div className="flex-item">
                            <Chart width="450" height="350" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;