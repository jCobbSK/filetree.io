import React, { useCallback, useState } from 'react';

import { getMarkedFolderNameWithQuery } from '../../store/FoldersService';
import { Icon, IconType } from '../../icon/Icon';
import { Menu } from './menu/Menu';
import style from './FolderItem.module.css';

interface Props {
    id: string;
    name: string;
    query: string;
}

export const FolderItem: React.FC<Props> = ({ id, name, query }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isIconVisible, setIconVisible] = useState(false);
    const handleClick = useCallback(() => {
        setIsMenuVisible(!isMenuVisible);
        setIconVisible(!isMenuVisible);
    }, [setIsMenuVisible, isMenuVisible, setIconVisible]);
    const handleMouseLeave = useCallback(() => {
        if (isMenuVisible) {
            return;
        }
        setIconVisible(false);
    }, [isMenuVisible, setIconVisible]);

    return (
        <div
            className={style.wrapper}
            onMouseEnter={() => setIconVisible(true)}
            onMouseLeave={handleMouseLeave}
        >
            <Icon type={IconType.FOLDER} className={style.icon} data-cy="folder-icon" />
            <span
                data-cy="folder-name"
                dangerouslySetInnerHTML={{ __html: getMarkedFolderNameWithQuery(name, query) }}
            />
            {isIconVisible && (
                <a href="#" onClick={handleClick} className={style.menuIcon} data-cy="menu-button">
                    <Icon type={IconType.MENU} />
                </a>
            )}
            {isMenuVisible && <Menu id={id} name={name} />}
        </div>
    );
};
