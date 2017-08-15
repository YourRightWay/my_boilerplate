import React from 'react';
import PropTypes from 'prop-types';

import Chart from '../components/chart';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {
                description: 'All therapeutic',
                investigation: [
                    {
                        angle: 180,
                        colorSegment: "#d13a33",
                        colorSubSegment: "#a9301b",
                        colorSubSegmentDarken: "#8c1f1a",
                        label: 'Risk'
                    },
                    {
                        angle: 90,
                        colorSegment: "#fcb13a",
                        colorSubSegment: "#fcb13a",
                        label: 'Warning'
                    },
                    {
                        angle: 90,
                        colorSegment: "#2bb874",
                        colorSubSegment: "#2bb874",
                        label: 'Done'
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div>
                <Chart width={600}
                       height={600}
                       duration={450}
                       delay={150}
                       radius={220}
                       innerRadiusDiff={1.8}
                       startScale={0.85}
                       padAngle={0}
                       data={this.state.data}/>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;
