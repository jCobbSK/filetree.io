import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';

describe('<App />', () => {
    it('renders tree container and content', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find('FolderTreeContainer')).toHaveLength(1);
        expect(wrapper.find('FolderTreeContainer')).toHaveProp({
            width: 320,
        });
        expect(wrapper.find('Separator')).toHaveLength(1);
        expect(wrapper.find('Content')).toHaveLength(1);
    });

    it('sets new width of folder tree container when separator triggers width change', () => {
        const wrapper = shallow(<App />);

        wrapper.find('Separator').simulate('widthChange', 400);

        expect(wrapper.find('FolderTreeContainer')).toHaveProp({
            width: 400,
        });
    });
});
