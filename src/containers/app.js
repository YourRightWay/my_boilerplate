import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
    render() {
        return (
            <div>
               <h1>Hello from my boilerplate!</h1>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;
