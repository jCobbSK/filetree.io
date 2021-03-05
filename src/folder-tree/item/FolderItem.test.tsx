import React from 'react';
import { shallow } from 'enzyme';

import * as useFolderItem from './useFolderItem';
import * as FolderTreeService from '../../store/FoldersService';
import { FolderItem } from './FolderItem';

const DEFAULT_HOOK_RESULTS = {
    isRenaming: false,
    isMenuVisible: false,
    isMenuIconVisible: false,
    onMenuIconClick: jest.fn().mockName('onMenuIconClick'),
    onMenuItemClick: jest.fn().mockName('onMenuItemClick'),
    onRenameMenuItemClick: jest.fn().mockName('onRenameMenuItemClick'),
    onRename: jest.fn().mockName('onRename'),
    onHover: jest.fn().mockName('onHover'),
    onHoverOut: jest.fn().mockName('onHoverOut'),
};

describe('<FolderItem />', () => {
    it('renders wrapper with hover listeners, icon and highlighted name with query when isRenaming is false', () => {
        const useFolderItemSpy = jest
            .spyOn(useFolderItem, 'useFolderItem')
            .mockReturnValueOnce(DEFAULT_HOOK_RESULTS);
        const getMarkedFolderNameSpy = jest
            .spyOn(FolderTreeService, 'getMarkedFolderNameWithQuery')
            .mockReturnValueOnce('NikeTransformed');

        const wrapper = shallow(<FolderItem id="uuid" name="Nike" query="N" />);

        expect(useFolderItemSpy).toHaveBeenCalledWith('uuid');
        expect(getMarkedFolderNameSpy).toHaveBeenCalledWith('Nike', 'N');
        expect(wrapper).toMatchSnapshot();
    });

    it('renders rename input when isRenaming is true', () => {
        jest.spyOn(useFolderItem, 'useFolderItem').mockReturnValueOnce({
            ...DEFAULT_HOOK_RESULTS,
            isRenaming: true,
        });

        const wrapper = shallow(<FolderItem id="uuid" name="Nike" query="N" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders menu when isMenuVisible is true', () => {
        jest.spyOn(useFolderItem, 'useFolderItem').mockReturnValueOnce({
            ...DEFAULT_HOOK_RESULTS,
            isMenuVisible: true,
        });

        const wrapper = shallow(<FolderItem id="uuid" name="Nike" query="N" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders menu icon when isMenuIconVisible is true', () => {
        jest.spyOn(useFolderItem, 'useFolderItem').mockReturnValueOnce({
            ...DEFAULT_HOOK_RESULTS,
            isMenuIconVisible: true,
        });

        const wrapper = shallow(<FolderItem id="uuid" name="Nike" query="N" />);

        expect(wrapper).toMatchSnapshot();
    });
});
