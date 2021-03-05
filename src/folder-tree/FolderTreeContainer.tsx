import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { SearchInput } from '../search-input/SearchInput';
import { FoldersList } from './list/FoldersList';
import { selectFilteredFolders } from '../store/FoldersSlice';
import style from './FolderTreeContainer.module.css';

interface Props {
    width: number;
}

const PADDING_X_OFFSET = 20;

export const FolderTreeContainer: React.FC<Props> = ({ width }) => {
    const [query, setQuery] = useState('');
    const folders = useSelector(selectFilteredFolders(query));

    return (
        <section
            className={style.container}
            data-cy="folder-tree-container"
            style={{ flex: `0 0 ${width - PADDING_X_OFFSET}px` }}
        >
            <SearchInput value={query} onChange={setQuery} />
            <FoldersList folders={folders} level={0} query={query} />
        </section>
    );
};
