import React from 'react';
import { shallow } from 'enzyme';

import { Content } from './Content';

describe('<Content />', () => {
    it('renders section with hello world', () => {
        const wrapper = shallow(<Content />);

        expect(wrapper.find('section')).toHaveProp({
            'data-cy': 'content',
            className: 'content',
            children: 'Hello World!',
        });
    });
});
