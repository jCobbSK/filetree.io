import React from 'react';
import { shallow } from 'enzyme';

import { FolderTreeContainer } from './FolderTreeContainer';

jest.mock('react-redux', () => ({
    useSelector: jest.fn((fn) => fn()),
}));

jest.mock('../store/FoldersSlice', () => ({
    selectFilteredFolders: jest.fn().mockReturnValue(() => []),
}));

describe('<FolderTreeContainer />', () => {
    it('renders section with width from prop with search input and folders list', () => {
        const wrapper = shallow(<FolderTreeContainer width={120} />);

        expect(wrapper.find('section')).toHaveProp({
            className: 'container',
            'data-cy': 'folder-tree-container',
            style: { flex: '0 0 100px' },
        });
        expect(wrapper.find('SearchInput')).toHaveProp({
            value: '',
        });
        expect(wrapper.find('FoldersList')).toHaveProp({
            folders: [],
            level: 0,
            query: '',
        });
    });

    it('changes value of search input and query when search input changes', () => {
        const wrapper = shallow(<FolderTreeContainer width={120} />);

        wrapper.find('SearchInput').simulate('change', 'New val');

        expect(wrapper.find('SearchInput')).toHaveProp({
            value: 'New val',
        });
        expect(wrapper.find('FoldersList')).toHaveProp({
            folders: [],
            level: 0,
            query: 'New val',
        });
    });
});
