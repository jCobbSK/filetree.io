import React from 'react';

import { Icon, IconType } from '../../icon/Icon';
import style from './FolderItem.module.css';

interface Props {
    name: string;
}

export const FolderItem: React.FC<Props> = ({ name }) => {
    return (
        <div className={style.wrapper}>
            <Icon type={IconType.FOLDER} className={style.icon} />
            <span data-cy="folder-name">{name}</span>
        </div>
    );
};
