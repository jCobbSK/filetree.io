import React from 'react';

import style from './Menu.module.css';

interface Props {
    id: string;
    name: string;
}

export const Menu: React.FC<Props> = () => {
    return (
        <div className={style.wrapper} data-cy="menu-wrapper">
            <nav>
                <button data-cy="add-child">Add child</button>
                <button data-cy="rename">Rename</button>
                <button data-cy="delete">Delete</button>
            </nav>
        </div>
    );
};
