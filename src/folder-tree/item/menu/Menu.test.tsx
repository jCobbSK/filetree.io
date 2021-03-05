import React from 'react';
import { shallow } from 'enzyme';

import * as useMenuActions from './useMenuActions';
import { Menu } from './Menu';

describe('<Menu />', () => {
    const addChildMock = jest.fn();
    const deleteFolderMock = jest.fn();
    const useMenuActionsSpy = jest.spyOn(useMenuActions, 'useMenuActions').mockReturnValue({
        addChild: addChildMock,
        deleteFolder: deleteFolderMock,
        renameFolder: jest.fn(),
    });

    it('calls hook with params and renders 3 CTA buttons', () => {
        const onClickMock = jest.fn();

        const wrapper = shallow(<Menu id="uuid" onClick={onClickMock} onRenameClick={() => {}} />);

        expect(useMenuActionsSpy).toHaveBeenCalledWith('uuid', onClickMock);
        expect(wrapper.find('button')).toHaveLength(3);
    });

    it('calls addChild when add child CTA is clicked', () => {
        const wrapper = shallow(<Menu id="uuid" onClick={() => {}} onRenameClick={() => {}} />);

        wrapper.find('[data-cy="add-child"]').simulate('click');

        expect(addChildMock).toHaveBeenCalledWith();
    });

    it('calls delete folder when delete child CTA is clicked', () => {
        const wrapper = shallow(<Menu id="uuid" onClick={() => {}} onRenameClick={() => {}} />);

        wrapper.find('[data-cy="delete"]').simulate('click');

        expect(deleteFolderMock).toHaveBeenCalledWith();
    });

    it('calls onRenameClick and onClick props when rename CTA is clicked', () => {
        const onClickMock = jest.fn();
        const onRenameClickMock = jest.fn();
        const wrapper = shallow(
            <Menu id="uuid" onClick={onClickMock} onRenameClick={onRenameClickMock} />,
        );

        wrapper.find('[data-cy="rename"]').simulate('click');

        expect(onRenameClickMock).toHaveBeenCalledWith();
        expect(onClickMock).toHaveBeenCalledWith();
    });
});
