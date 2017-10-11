import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import nanoId from 'nanoid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Utils from '../../../../utils';
import { saveId } from '../../../../actions/studies';
import styles from './study-sector.css';

class StudySector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: false
        };
    }

    componentWillMount() {
        if (this.props.currentSectorId === this.props.id) {
            this.setState(() => Object.assign({
                id: this.props.currentSectorId
            }));
        };
    }

    renderPath() {
        const { arcs, milestones } = this.props;
        return arcs.map((data, index) => (
            <path
                key={nanoId(6)}
                fill={Utils.defineMilestoneColor(milestones[index].status, milestones[index].completion)}
                d={data} />
        ));
    }

    onMouseEnterHandler(id) {
        this.props.saveId(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentSectorId === this.props.id) {
            this.setState(() => Object.assign({ id: nextProps.currentSectorId }));
        } else {
            this.setState(() => Object.assign({ id: false }));
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.state.id === this.props.id || this.props.id === nextProps.currentSectorId;
    }

    renderIndicator() {
        const { indX, indY, indRadius, indColor, id, currentSectorId } = this.props;
        if (id !== currentSectorId) return null;

        return (
            <g>
                <circle
                    className="study-indicator"
                    stroke={Utils.colors.LIGHT_BLUE}
                    r={indRadius}
                    fill={indColor}
                    cx={indX}
                    cy={indY} />
                <circle
                    r={indRadius + (indRadius / 2)}
                    fill="transparent"
                    cx={indX}
                    cy={indY} />
            </g>
        );
    }

    render() {
        const { clickHandler, id, currentSectorId } = this.props;

        const activeClass = classNames({
            'study-sector study-sector__active': currentSectorId === id,
            'study-sector study-sector__notactive': currentSectorId !== id,
            'study-sector': !id,
        });

        return (
            <g
                className={activeClass}
                onMouseEnter={() => id && this.onMouseEnterHandler(id)}
                onClick={() => clickHandler && clickHandler()}>
                {this.renderPath()}
                {this.renderIndicator()}
            </g>
        );
    }
}

StudySector.defaultProps = {
    clickHandler: null,
    id: undefined,
    indColor: '#fff',
    indRadius: 8,
};

function mapStateToProps(state) {
    return {
        currentSectorId: state.sectors.currentSectorId
    };
}

const mapDispatchToProps = {
    saveId
};

StudySector.propTypes = {
    arcs: PropTypes.array.isRequired,
    clickHandler: PropTypes.func,
    currentSectorId: PropTypes.string.isRequired,
    id: PropTypes.string,
    indColor: PropTypes.string,
    indRadius: PropTypes.number,
    indX: PropTypes.number.isRequired,
    indY: PropTypes.number.isRequired,
    milestones: PropTypes.array.isRequired
};

const ConnectedStudySector = CSSModules(StudySector, styles);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedStudySector);
