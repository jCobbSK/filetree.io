import React from 'react';

import { getMarkedFolderNameWithQuery } from '../../store/FoldersService';
import { Icon, IconType } from '../../icon/Icon';
import style from './FolderItem.module.css';

interface Props {
    name: string;
    query: string;
}

export const FolderItem: React.FC<Props> = ({ name, query }) => {
    return (
        <div className={style.wrapper}>
            <Icon type={IconType.FOLDER} className={style.icon} />
            <span
                data-cy="folder-name"
                dangerouslySetInnerHTML={{ __html: getMarkedFolderNameWithQuery(name, query) }}
            />
        </div>
    );
};
