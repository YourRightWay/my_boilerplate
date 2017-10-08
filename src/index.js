import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as shapes from 'd3-shape';
import nanoId from 'nanoid';
import fill from 'lodash.fill';
import isEqual from 'lodash.isequal';
import ResponsiveSVG from '../../../molecules/responsive-svg';
import WidgetTitle from '../../../atoms/widget-title';
import StudySector from '../../../atoms/d3/study-sector';
import Legend from '../../../atoms/d3/legend';
import Utils from '../../../../utils/index';
// import JSON from './fakeData.json';

/**
 * Component compute own values with depends of wrapperRadius
 */
class BasicChartWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            milestonesOrder: [
                { name: 'FP' },
                { name: 'FPFV' },
                { name: 'LPFT' },
                { name: 'CSR ' },
                { name: 'CTT KO' }
            ]
        };

        this.WRAPPER_RADIUS = props.wrapperRadius;
        this.INNER_BLUE_CIRCLE_RADIUS = this.WRAPPER_RADIUS - (this.WRAPPER_RADIUS / 6);
        this.INNER_SPLIT_RADIUS = this.WRAPPER_RADIUS - (this.WRAPPER_RADIUS / 12);
        this.OFFSET_TO_CIRCLES = this.INNER_BLUE_CIRCLE_RADIUS -
            ((this.WRAPPER_RADIUS - this.INNER_BLUE_CIRCLE_RADIUS) / 2.8);

        // Min quantity studies
        this.MIN_STUDIES = props.minStudies;

        // Min quantity milestones
        this.MIN_MILESTONES = 5;

        // Indicator radius
        this.INDICATOR_RADIUS = 8;

        // coefficient for inner radius
        // Prev radius / 1.5
        this.COEFF_RADIUS = 1.5;

        // Circles radius
        this.RADIUS_1 = this.OFFSET_TO_CIRCLES;
        this.INNER_RADIUS_1 = this.calcRadius(this.OFFSET_TO_CIRCLES, 0.25);

        this.RADIUS_2 = this.calcRadius(this.INNER_RADIUS_1, 0.035);
        this.INNER_RADIUS_2 = this.calcInnerRadius(this.RADIUS_2, this.RADIUS_1, this.INNER_RADIUS_1);

        this.RADIUS_3 = this.calcRadius(this.INNER_RADIUS_2, 0.035);
        this.INNER_RADIUS_3 = this.calcInnerRadius(this.RADIUS_3, this.RADIUS_2, this.INNER_RADIUS_2);

        this.RADIUS_4 = this.calcRadius(this.INNER_RADIUS_3, 0.025);
        this.INNER_RADIUS_4 = this.calcInnerRadius(this.RADIUS_4, this.RADIUS_3, this.INNER_RADIUS_3);

        this.RADIUS_5 = this.calcRadius(this.INNER_RADIUS_4, 0.025);
        this.INNER_RADIUS_5 = this.calcInnerRadius(this.RADIUS_5, this.RADIUS_4, this.INNER_RADIUS_4);

        this.RADIUSES = [
            [this.INNER_RADIUS_1, this.RADIUS_1],
            [this.INNER_RADIUS_2, this.RADIUS_2],
            [this.INNER_RADIUS_3, this.RADIUS_3],
            [this.INNER_RADIUS_4, this.RADIUS_4],
            [this.INNER_RADIUS_5, this.RADIUS_5],
        ];

        // Values for arc generator

        // Which part of sector angle to use as padding angle
        this.PADDING_FACTOR = props.paddingFactor;
        // Calculate padRadius as d3 would calculate it for one big arc
        this.PADDING_RADIUS = Math.sqrt((this.INNER_RADIUS_5 ** 2) + (this.RADIUS_1 ** 2));

        // Get array with degrees which depends of studies quantity
        this.studiesDegrees = this.convertStudiesToDegree();
        
        this.franchiseReducedDegrees = this.parseFranchise(props.data);

        this.routeToStudy = this.routeToStudy.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.data, nextProps.data)) {
            this.setState(() => Object.assign({
                data: nextProps.data
            }));
        }
    }

    calcRadius(prevValue, k) {
        return prevValue - (this.OFFSET_TO_CIRCLES * k);
    }

    calcInnerRadius(radius, prevRadius, prevInnerRadius, k = this.COEFF_RADIUS) {
        return radius - ((prevRadius - prevInnerRadius) / k);
    }

    /**
     * @description convert studies length to degrees
     */
    convertStudiesToDegree() {
        const { data } = this.state;
        const studiesLength = data.length;
        return fill(new Array(Math.max(studiesLength, this.MIN_STUDIES)), 1);
    }

    transformDataFromBackend(data) {
        const { milestonesOrder } = this.state;
        const sortedData = data
            .map(i => Object.assign(
                i,
                {
                    milestones: milestonesOrder
                        .map(item => i
                            .milestones
                            .find(milestone => milestone.name === item.name))
                        .reverse()
                }
            ));

        const studiesLength = sortedData.length;

        if (studiesLength >= this.MIN_STUDIES) return sortedData;

        // fake data for milestone
        const milestones = fill(new Array(this.MIN_MILESTONES), { status: 'SERIF' });
        const fakeData = fill(new Array(this.MIN_STUDIES - studiesLength), { milestones });
        return [].concat(sortedData, fakeData);
    }

    routeToStudy(id) {
        if (id) {
            this.props.history.push(`process-details/${id}`);
        }
    }

    createStudiesSectors(studies) {
        const studiesData = this.transformDataFromBackend(studies);
        const studiesLength = studiesData.length;
        const paddingAngle = this.PADDING_FACTOR * ((2 * Math.PI) / studiesLength);
        const pie = shapes.pie().sort(null).padAngle(paddingAngle);
        const dataFromD3 = pie(this.studiesDegrees);

        return dataFromD3.map((d, index) => {
            const arcGenerators = this.RADIUSES.map(
                ([innerRadius, radius]) => Utils.generatePathFromD3(
                    innerRadius,
                    radius,
                    d.startAngle,
                    d.endAngle,
                    d.padAngle,
                    this.PADDING_RADIUS
                )
            );

            const { milestones, id } = studiesData[index];

            const centroid = arcGenerators[0].centroid(d);
            const middleAngle = Math.atan2(centroid[1], centroid[0]);
            const x = Math.cos(middleAngle) * this.INNER_BLUE_CIRCLE_RADIUS;
            const y = Math.sin(middleAngle) * this.INNER_BLUE_CIRCLE_RADIUS;

            return (
                <StudySector
                    arcs={arcGenerators.map((arc) => arc())}
                    clickHandler={() => this.routeToStudy(id)}
                    id={id}
                    indX={x}
                    indY={y}
                    indRadius={this.INDICATOR_RADIUS}
                    key={nanoId(6)}
                    milestones={milestones.slice(0, this.MIN_MILESTONES)} />
            );
        });
    }

    parseFranchise(data) {
        let parsedFranchise = [];
        let counter = Utils.counter();
        const studiesData = this.transformDataFromBackend(data);
        const studiesLength = studiesData.length;
        const degItem = 360 / studiesLength;

        data.reduce((acc, current) => {
            if(acc.franchise === current.franchise) {
                if (!parsedFranchise.length) {
                    parsedFranchise[0] = {[acc.franchise]: counter()};
                } else {
                    parsedFranchise[parsedFranchise.length - 1] = {[acc.franchise]: counter()};
                }
            } else {
                parsedFranchise.push({[current.franchise]: counter(1)});
            }
            return current
        }, []);

        const reducedDegrees = parsedFranchise.reduce((acc, current, index) => {
            const currentKeys = Object.keys(current);
            const accumulatorKeys = Object.keys(acc[index])[0];

            return acc.concat(Object.assign({}, {[currentKeys]: acc[index][accumulatorKeys] + (current[currentKeys] * degItem)}))
        }, [{0: 0}])

        reducedDegrees.shift();

        return reducedDegrees
    }

    renderFirstSeparator() {
        const x = Utils.angleCoordinates(0, 0, this.INNER_SPLIT_RADIUS, 0).x;
        const y = Utils.angleCoordinates(0, 0, this.INNER_SPLIT_RADIUS, 0).y;
        return (
            <line
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke={Utils.colors.LIGHT_BLUE}
                strokeWidth="1" />
        );
    }

    createSeparators() {
        return this.franchiseReducedDegrees.map((data) => {
            const deg = data[Object.keys(data)];
            const x = Utils.angleCoordinates(0, 0, this.INNER_SPLIT_RADIUS, deg).x;
            const y = Utils.angleCoordinates(0, 0, this.INNER_SPLIT_RADIUS, deg).y;

            return (
                <line
                    key={nanoId(6)}
                    x1={0}
                    y1={0}
                    x2={x}
                    y2={y}
                    stroke={Utils.colors.LIGHT_BLUE}
                    strokeWidth="1" />
            );
        });
    }

    createLabels() {
        let startAngle = 0;
        return this.franchiseReducedDegrees.map((data) => {
            const keyLabel = Object.keys(data)[0];
            const endAngle = Utils.mathRadians(data[keyLabel]);
            const arcGenerator = Utils.generatePathFromD3(this.INNER_BLUE_CIRCLE_RADIUS, this.WRAPPER_RADIUS, startAngle, endAngle);
            const centroid = arcGenerator.centroid();
            const midAngle = endAngle < Math.PI ? startAngle / 2 + endAngle /2 : startAngle/2  + endAngle/2 + Math.PI;
            const x = centroid[0];
            const y = centroid[1];
            const rotateValue = (midAngle * 180/Math.PI);
            function rotateAngle() {
                if ((startAngle >= Utils.mathRadians(0) && startAngle <= Utils.mathRadians(89)) ||
                    startAngle >= Utils.mathRadians(180) && startAngle <= Utils.mathRadians(269)) {
                    return 0
                }

                if (startAngle >= Utils.mathRadians(90) && startAngle <= Utils.mathRadians(179)) {
                    return -180
                }

                if (startAngle >= Utils.mathRadians(270) && startAngle <= Utils.mathRadians(360)) {
                    return 180
                }
            }
            startAngle = endAngle;

            return (
                <text
                    key={nanoId(6)}
                    transform={`translate(${x}, ${y}), rotate(${rotateAngle()}) rotate(${rotateValue})`}
                    fill={Utils.colors.LIGHT_BLUE}
                    fontSize={8}
                    textAnchor="middle"
                    dy="0.35">
                    {keyLabel}
                </text>
            )
        })
    }

    renderWrapperCircle() {
        const { circleWrapper } = this.props;
        if (!circleWrapper) return null;

        return (
            <circle
                strokeWidth={1}
                stroke={Utils.colors.BLUE_DARK}
                r={this.WRAPPER_RADIUS}
                fill={Utils.colors.BLUE_ULTRA_DARK}
                cx={0}
                cy={0} />
        );
    }

    renderInnerCircle() {
        return (
            <circle
                strokeWidth={1}
                stroke={Utils.colors.LIGHT_BLUE}
                r={this.INNER_BLUE_CIRCLE_RADIUS}
                fill="transparent"
                cx={0}
                cy={0} />
        );
    }

    render() {
        const { data, milestonesOrder } = this.state;
        const { width, height, widgetDescription } = this.props;

        return (
            <div>
                <WidgetTitle text={widgetDescription} bg />
                <ResponsiveSVG height={height} width={width}>
                    <g transform={`translate(${width / 2},${(height / 2)})`}>
                        {this.renderWrapperCircle()}
                        {this.renderInnerCircle()}
                        {this.createStudiesSectors(data)}
                        {this.renderFirstSeparator()}
                        {this.createSeparators()}
                        {this.createLabels()}
                    </g>
                    <Legend
                        containerWidth={width}
                        containerHeight={height}
                        data={milestonesOrder}
                        radius={40}
                        position="bottom left" />
                </ResponsiveSVG>
            </div>
        );
    }
}

BasicChartWidget.defaultProps = {
    wrapperRadius: 210,
    width: 550,
    height: 550,
    history: null,
    circleWrapper: true,
    data: [],
    minStudies: 25,
    paddingFactor: 0.175
};

BasicChartWidget.propTypes = {
    circleWrapper: PropTypes.bool,
    data: PropTypes.array,
    height: PropTypes.number,
    history: React.PropTypes.shape({
        push: React.PropTypes.func,
    }),
    minStudies: PropTypes.number,
    paddingFactor: PropTypes.number,
    widgetDescription: PropTypes.string.isRequired,
    width: PropTypes.number,
    wrapperRadius: PropTypes.number,
};

export default BasicChartWidget;
