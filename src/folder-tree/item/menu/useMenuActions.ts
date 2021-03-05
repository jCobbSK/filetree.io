import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { renameFolder, addChild, removeFolder } from '../../../store/FoldersSlice';

interface HookResult {
    addChild(): void;
    deleteFolder(): void;
    renameFolder(newName: string): void;
}

export const useMenuActions = (id: string, callback?: () => void): HookResult => {
    const dispatch = useDispatch();
    const handleAddChild = useCallback(() => {
        dispatch(addChild(id));
        callback?.();
    }, [id, callback, dispatch]);
    const handleDeleteFolder = useCallback(() => {
        dispatch(removeFolder(id));
        callback?.();
    }, [id, callback, dispatch]);
    const handleRenameFolder = useCallback(
        (newName: string) => {
            dispatch(renameFolder({ id, newName }));
            callback?.();
        },
        [id, callback, dispatch],
    );

    return {
        addChild: handleAddChild,
        deleteFolder: handleDeleteFolder,
        renameFolder: handleRenameFolder,
    };
};
