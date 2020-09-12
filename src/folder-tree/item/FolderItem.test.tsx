import React from 'react';
import { shallow } from 'enzyme';

import * as FolderTreeService from '../FolderTreeService';
import { IconType } from '../../icon/Icon';
import { FolderItem } from './FolderItem';

describe('<FolderItem />', () => {
    it('renders icon and highlighted name with query', () => {
        const getMarkedFolderNameSpy = jest
            .spyOn(FolderTreeService, 'getMarkedFolderNameWithQuery')
            .mockReturnValueOnce('NikeTransformed');

        const wrapper = shallow(<FolderItem name="Nike" query="N" />);

        expect(getMarkedFolderNameSpy).toHaveBeenCalledWith('Nike', 'N');
        expect(wrapper.find('Icon')).toHaveProp({
            type: IconType.FOLDER,
            className: 'icon',
        });
        expect(wrapper.find('[data-cy="folder-name"]')).toHaveProp({
            dangerouslySetInnerHTML: {
                __html: 'NikeTransformed',
            },
        });
    });
});
