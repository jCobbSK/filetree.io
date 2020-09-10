import React from 'react';
import { shallow } from 'enzyme';

import { IconType } from '../../icon/Icon';
import { FolderItem } from './FolderItem';

describe('<FolderItem />', () => {
    it('renders icon and name', () => {
        const wrapper = shallow(<FolderItem name="Nike" />);

        expect(wrapper.find('Icon')).toHaveProp({
            type: IconType.FOLDER,
            className: 'icon',
        });
        expect(wrapper.find('[data-cy="folder-name"]')).toHaveProp({
            children: 'Nike',
        });
    });
});
