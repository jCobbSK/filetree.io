import React, { useState } from 'react';

import { Content } from './content/Content';
import { FolderTreeContainer } from './folder-tree/FolderTreeContainer';
import { Separator } from './separator/Separator';
import style from './App.module.css';

const DEFAULT_LEFT_PANEL_WIDTH = 320;

export function App() {
    const [treeWidth, setTreeWidth] = useState(DEFAULT_LEFT_PANEL_WIDTH);

    return (
        <div className={style.wrapper} data-cy="application-wrapper">
            <FolderTreeContainer width={treeWidth} />
            <Separator onWidthChange={setTreeWidth} />
            <Content />
        </div>
    );
}

export default App;
