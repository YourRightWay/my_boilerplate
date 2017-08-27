import React from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';

class AngleChartWithEvent extends React.Component {
    render() {
        const { arc, color, children } = this.props;
        return (
            <g>
                <path
                    ref={(node) => { this.node = node; }}
                    d={arc}
                    fill={color} />
                {children}
            </g>
        );
    }
}

AngleChartWithEvent.defaultProps = {
    children: null
};

AngleChartWithEvent.propTypes = {
    arc: PropTypes.string.isRequired,
    children: PropTypes.node,
    color: PropTypes.string.isRequired
};

export default AngleChartWithEvent;
