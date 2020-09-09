import React, { useState } from 'react';

import { folders } from '../store/folders.json';
import style from './FolderTreeContainer.module.css';
import { SearchInput } from '../search-input/SearchInput';

export const FolderTreeContainer: React.FC = () => {
    const [value, setValue] = useState('');

    return (
        <section className={style.container}>
            <SearchInput value={value} onChange={setValue} />
            {folders.map((folder) => (
                <div>{folder}</div>
            ))}
        </section>
    );
};
