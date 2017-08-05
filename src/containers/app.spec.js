import React from 'react';
import {shallow} from 'enzyme';
import App from './app';

describe('<AppPage />', () => {
    it('should have a header called \'App\'', () => {
        const wrapper = shallow(<App />);
        const actual = wrapper.find('h1').text();
        const expected = 'Hello from my boilerplate!';

        expect(actual).toEqual(expected);
    });
});
