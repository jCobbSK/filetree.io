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
                <a href="#" data-cy="add-child">
                    Add child
                </a>
                <a href="#" data-cy="rename">
                    Rename
                </a>
                <a href="#" data-cy="delete">
                    Delete
                </a>
            </nav>
        </div>
    );
};
