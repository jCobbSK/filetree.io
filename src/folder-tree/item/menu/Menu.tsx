import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addChild, removeFolder } from '../../../store/FoldersSlice';
import style from './Menu.module.css';

interface Props {
    id: string;
    name: string;
}

export const Menu: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch();
    const handleAddChild = useCallback(() => {
        dispatch(addChild(id));
    }, [id, dispatch]);
    const handleDelete = useCallback(() => {
        dispatch(removeFolder(id));
    }, [id, dispatch]);

    return (
        <div className={style.wrapper} data-cy="menu-wrapper">
            <nav>
                <button data-cy="add-child" onClick={handleAddChild}>
                    Add child
                </button>
                <button data-cy="rename">Rename</button>
                <button data-cy="delete" onClick={handleDelete}>
                    Delete
                </button>
            </nav>
        </div>
    );
};
