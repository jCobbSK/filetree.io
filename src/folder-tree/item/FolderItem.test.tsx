import React from 'react';
import { shallow } from 'enzyme';

import * as FolderTreeService from '../../store/FoldersService';
import { IconType } from '../../icon/Icon';
import { FolderItem } from './FolderItem';

describe('<FolderItem />', () => {
    it('renders icon and highlighted name with query', () => {
        const getMarkedFolderNameSpy = jest
            .spyOn(FolderTreeService, 'getMarkedFolderNameWithQuery')
            .mockReturnValueOnce('NikeTransformed');

        const wrapper = shallow(<FolderItem id="uuid" name="Nike" query="N" />);

        expect(getMarkedFolderNameSpy).toHaveBeenCalledWith('Nike', 'N');
        expect(wrapper.find('[data-cy="folder-icon"]')).toHaveProp({
            type: IconType.FOLDER,
            className: 'icon',
        });
        expect(wrapper.find('[data-cy="folder-name"]')).toHaveProp({
            dangerouslySetInnerHTML: {
                __html: 'NikeTransformed',
            },
        });
    });

    it('renders menu icon when mouse is entered over component', () => {
        const wrapper = shallow(<FolderItem id="uuid" name="Nike" query="N" />);

        wrapper.simulate('mouseEnter');

        expect(wrapper.find('[data-cy="menu-button"]')).toHaveLength(1);
        expect(wrapper.find('[data-cy="menu-button"] > Icon')).toHaveLength(1);
    });

    it('renders menu when menu icon is clicked', () => {
        const wrapper = shallow(<FolderItem id="uuid" name="Nike" query="N" />);
        wrapper.simulate('mouseEnter');

        wrapper.find('[data-cy="menu-button"]').simulate('click');

        expect(wrapper.find('Menu')).toHaveProp({
            id: 'uuid',
            name: 'Nike',
        });
    });
});
