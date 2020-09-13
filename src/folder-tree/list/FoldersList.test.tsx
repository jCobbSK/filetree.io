import React from 'react';
import { shallow } from 'enzyme';

import { FoldersList } from './FoldersList';

describe('<FoldersList />', () => {
    it('renders FolderItem and FoldersList for each folder', () => {
        const folders = [
            {
                id: 'uuid',
                name: 'Nike',
                subFolders: [],
            },
        ];

        const wrapper = shallow(<FoldersList folders={folders} level={0} query="Q" />);

        expect(wrapper.find('FolderItem')).toHaveLength(1);
        expect(wrapper.find('FolderItem')).toHaveProp({
            name: 'Nike',
            query: 'Q',
            id: 'uuid',
        });
        expect(wrapper.find('FoldersList')).toHaveLength(1);
        expect(wrapper.find('FoldersList')).toHaveProp({
            query: 'Q',
            folders: [],
            level: 1,
        });
    });
});
