import React from 'react';

import { Content } from './content/Content';
import { FolderTreeContainer } from './folder-tree/FolderTreeContainer';
import style from './App.module.css';

export function App() {
    return (
        <div className={style.wrapper} data-cy="application-wrapper">
            <FolderTreeContainer />
            <Content />
        </div>
    );
}

export default App;
