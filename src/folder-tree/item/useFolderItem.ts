import { useCallback, useState } from 'react';
import { useMenuActions } from './menu/useMenuActions';

interface HookResult {
    isRenaming: boolean;
    isMenuVisible: boolean;
    isMenuIconVisible: boolean;
    onMenuIconClick(): void;
    onMenuItemClick(): void;
    onRenameMenuItemClick(): void;
    onRename(newName: string): void;
    onHover(): void;
    onHoverOut(): void;
}

export const useFolderItem = (id: string): HookResult => {
    const { renameFolder } = useMenuActions(id);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuIconVisible, setIconVisible] = useState(false);
    const [isRenaming, setRenaming] = useState(false);
    const onMenuIconClick = useCallback(() => {
        setIsMenuVisible(!isMenuVisible);
        setIconVisible(!isMenuVisible);
    }, [setIsMenuVisible, isMenuVisible, setIconVisible]);
    const onHover = useCallback(() => {
        setIconVisible(true);
    }, [setIconVisible]);
    const onHoverOut = useCallback(() => {
        if (isMenuVisible) {
            return;
        }
        setIconVisible(false);
    }, [isMenuVisible, setIconVisible]);
    const onMenuItemClick = useCallback(() => {
        setIsMenuVisible(false);
    }, [setIsMenuVisible]);
    const onRenameMenuItemClick = useCallback(() => {
        setRenaming(true);
    }, [setRenaming]);
    const onRename = useCallback(
        (newName: string) => {
            setRenaming(false);
            if (!newName) {
                alert('Name is required');
                return;
            }
            renameFolder(newName);
        },
        [setRenaming, renameFolder],
    );

    return {
        isRenaming,
        isMenuVisible,
        isMenuIconVisible,
        onMenuIconClick,
        onHover,
        onHoverOut,
        onMenuItemClick,
        onRename,
        onRenameMenuItemClick,
    };
};
