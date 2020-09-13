import React from 'react';

import { getMarkedFolderNameWithQuery } from '../../store/FoldersService';
import { Icon, IconType } from '../../icon/Icon';
import { Menu } from './menu/Menu';
import style from './FolderItem.module.css';
import { RenameInput } from './RenameInput';
import { useFolderItem } from './useFolderItem';

interface Props {
    id: string;
    name: string;
    query: string;
}

export const FolderItem: React.FC<Props> = ({ id, name, query }) => {
    const {
        isRenaming,
        isMenuVisible,
        isMenuIconVisible,
        onMenuIconClick,
        onMenuItemClick,
        onRenameMenuItemClick,
        onRename,
        onHover,
        onHoverOut,
    } = useFolderItem(id);

    return (
        <div className={style.wrapper} onMouseEnter={onHover} onMouseLeave={onHoverOut}>
            <Icon type={IconType.FOLDER} className={style.icon} data-cy="folder-icon" />
            {!isRenaming && (
                <span
                    data-cy="folder-name"
                    dangerouslySetInnerHTML={{ __html: getMarkedFolderNameWithQuery(name, query) }}
                />
            )}
            {isRenaming && <RenameInput name={name} onConfirm={onRename} />}
            {isMenuIconVisible && (
                <button onClick={onMenuIconClick} className={style.menuIcon} data-cy="menu-button">
                    <Icon type={IconType.MENU} />
                </button>
            )}
            {isMenuVisible && (
                <Menu id={id} onClick={onMenuItemClick} onRenameClick={onRenameMenuItemClick} />
            )}
        </div>
    );
};
