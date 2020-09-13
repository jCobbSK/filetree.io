import React from 'react';
import { shallow } from 'enzyme';

import { Menu } from './Menu';

describe('<Menu />', () => {
    it('renders 3 CTA buttons', () => {
        const wrapper = shallow(<Menu id="uuid" name="Nike" />);

        expect(wrapper.find('a')).toHaveLength(3);
    });
});
