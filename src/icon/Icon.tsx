import React from 'react';
import { ReactComponent as FolderIcon } from './data/folder.svg';
import { ReactComponent as MenuIcon } from './data/menu.svg';
import { ReactComponent as MirrorIcon } from './data/mirror-glass.svg';

export enum IconType {
    FOLDER,
    MENU,
    MIRROR,
}

const ICON_MAP = {
    [IconType.FOLDER]: FolderIcon,
    [IconType.MENU]: MenuIcon,
    [IconType.MIRROR]: MirrorIcon,
};

interface Props {
    type: IconType;
    className?: string;
}

export const Icon: React.FC<Props> = ({ type, className }) => {
    const PickedIcon = ICON_MAP[type];
    return (
        <span className={className}>
            <PickedIcon />
        </span>
    );
};
