import React, { useState } from 'react';

import { paths } from '../store/folders.json';
import style from './FolderTreeContainer.module.css';
import { SearchInput } from '../search-input/SearchInput';
import { getFolders } from './FolderTreeService';
import { FoldersList } from './list/FoldersList';

interface Props {
    width: number;
}

const PADDING_X_OFFSET = 20;

export const FolderTreeContainer: React.FC<Props> = ({ width }) => {
    const [query, setQuery] = useState('');
    const folders = getFolders(paths, query);

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
