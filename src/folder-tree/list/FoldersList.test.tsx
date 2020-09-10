import React from 'react';
import { shallow } from 'enzyme';

import { FoldersList } from './FoldersList';

describe('<FoldersList />', () => {
    it('renders FolderItem and FoldersList for each folder', () => {
        const folders = [
            {
                name: 'Nike',
                subFolders: [],
            },
        ];

        const wrapper = shallow(<FoldersList folders={folders} level={0} />);

        expect(wrapper.find('FolderItem')).toHaveLength(1);
        expect(wrapper.find('FolderItem')).toHaveProp({
            name: 'Nike',
        });
        expect(wrapper.find('FoldersList')).toHaveLength(1);
        expect(wrapper.find('FoldersList')).toHaveProp({
            folders: [],
            level: 1,
        });
    });
});
