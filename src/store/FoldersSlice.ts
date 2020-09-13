import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { paths } from './folders.json';
import {
    getParsedFoldersFromPaths,
    getFilteredFolders,
    Folder,
    findFolderById,
    createFolder,
    getFoldersWithoutFolderWithId,
} from './FoldersService';
import { StoreType } from './store';

interface State {
    folders: Folder[];
}

const initialState: State = {
    folders: getParsedFoldersFromPaths(paths),
};

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        addChild(state: State, { payload }: PayloadAction<string>) {
            const folder = findFolderById(state.folders, payload);
            if (folder) {
                folder.subFolders.push(createFolder('Newly added folder'));
            }
        },
        removeFolder(state: State, { payload }: PayloadAction<string>) {
            state.folders = getFoldersWithoutFolderWithId(state.folders, payload);
        },
    },
});

export const {
    reducer: foldersReducer,
    actions: { addChild, removeFolder },
} = foldersSlice;

export const selectFilteredFolders = (query: string) => (store: StoreType) => {
    if (!query) {
        return store.foldersReducer.folders;
    }
    return getFilteredFolders(store.foldersReducer.folders, query);
};
