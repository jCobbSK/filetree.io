import React, { useCallback } from 'react';

import { useMenuActions } from './useMenuActions';
import style from './Menu.module.css';

interface Props {
    id: string;
    onClick(): void;
    onRenameClick(): void;
}

export const Menu: React.FC<Props> = ({ id, onClick, onRenameClick }) => {
    const { addChild, deleteFolder } = useMenuActions(id, onClick);
    const handleRename = useCallback(() => {
        onRenameClick();
        onClick();
    }, [onRenameClick, onClick]);

    return (
        <div className={style.wrapper} data-cy="menu-wrapper">
            <nav>
                <button data-cy="add-child" onClick={addChild}>
                    Add child
                </button>
                <button data-cy="rename" onClick={handleRename}>
                    Rename
                </button>
                <button data-cy="delete" onClick={deleteFolder}>
                    Delete
                </button>
            </nav>
        </div>
    );
};
