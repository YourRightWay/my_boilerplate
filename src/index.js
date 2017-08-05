import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/app';
import './styles.scss';

require('./favicon.ico');

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./containers/app', () => {
        const NewRoot = require('./containers/app').default;
        render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
