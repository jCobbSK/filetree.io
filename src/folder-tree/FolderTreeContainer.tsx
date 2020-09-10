import React, { useState } from 'react';

import { paths } from '../store/folders.json';
import style from './FolderTreeContainer.module.css';
import { SearchInput } from '../search-input/SearchInput';
import { getFolders } from './FolderTreeService';
import { FoldersList } from './list/FoldersList';

export const FolderTreeContainer: React.FC = () => {
    const [value, setValue] = useState('');
    const folders = getFolders(paths);

    return (
        <section className={style.container}>
            <SearchInput value={value} onChange={setValue} />
            <FoldersList folders={folders} level={0} />
        </section>
    );
};
