import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';

describe('<App />', () => {
    it('renders tree container and content', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find('FolderTreeContainer')).toHaveLength(1);
        expect(wrapper.find('Content')).toHaveLength(1);
    });
});
