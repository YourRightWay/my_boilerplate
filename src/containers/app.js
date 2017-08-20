import React from 'react';
import PropTypes from 'prop-types';

import ReactChart from '../components/chart';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {letter: 'Alpha savec', frequency: .08167},
                {letter: 'B', frequency: .01492},
                {letter: 'C', frequency: .02782},
                {letter: 'D', frequency: .04253},
                {letter: 'E', frequency: .12702},
                {letter: 'F', frequency: .02288},
                {letter: 'G', frequency: .02015},
                {letter: 'H', frequency: .06094},
                {letter: 'I', frequency: .06966},
                {letter: 'J', frequency: .00153},
                {letter: 'K', frequency: .00772},
                {letter: 'L', frequency: .04025},
                {letter: 'M', frequency: .02406},
                {letter: 'N', frequency: .06749},
                {letter: 'O', frequency: .07507},
                {letter: 'P', frequency: .01929},
                {letter: 'Q', frequency: .00095},
                {letter: 'R', frequency: .05987},
                {letter: 'S', frequency: .06327},
                {letter: 'T', frequency: .09056},
                {letter: 'U', frequency: .02758},
                {letter: 'V', frequency: .00978},
                {letter: 'W', frequency: .02360},
                {letter: 'X', frequency: .00150},
                {letter: 'Y', frequency: .01974},
                {letter: 'Z', frequency: .00074}]
        }
        this.test = this.test.bind(this);
    }
    
    test() {
        this.state.text = 'Hello form chart!'.toUpperCase();
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <ReactChart width={800} height={500}  data={this.state.data}/>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;