import React, { useState } from 'react';

import { paths } from '../store/folders.json';
import style from './FolderTreeContainer.module.css';
import { SearchInput } from '../search-input/SearchInput';
import { getFolders } from './FolderTreeService';
import { FoldersList } from './list/FoldersList';

export const FolderTreeContainer: React.FC = () => {
    const [query, setQuery] = useState('');
    const folders = getFolders(paths, query);

    return (
        <section className={style.container}>
            <SearchInput value={query} onChange={setQuery} />
            <FoldersList folders={folders} level={0} />
        </section>
    );
};
