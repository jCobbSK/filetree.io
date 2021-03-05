import React from 'react';
import { shallow } from 'enzyme';

import { Icon, IconType } from './Icon';

describe('<Icon />', () => {
    it('renders specific type icon', () => {
        const wrapper = shallow(<Icon type={IconType.FOLDER} />);

        expect(wrapper).toMatchInlineSnapshot(`
            <span>
              <ForwardRef(SvgFolder) />
            </span>
        `);
    });
});
