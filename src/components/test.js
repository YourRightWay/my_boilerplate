import React from 'react';

export const Bar = ({text}) => (
    <g>
        <text>{text}</text>
    </g>
);

export const Baz = ({text}) => (
    <g>
        <text>{text}</text>
    </g>
);

Bar.defaultProps = {
    text: 'Hello from bar'
};

Baz.defaultProps = {
    text: 'Hello from baz'
};