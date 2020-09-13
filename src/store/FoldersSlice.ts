import { createSlice } from '@reduxjs/toolkit';

import { paths } from './folders.json';
import { getParsedFoldersFromPaths, getFilteredFolders } from './FoldersService';
import { StoreType } from './store';

const foldersSlice = createSlice({
    name: 'folders',
    initialState: getParsedFoldersFromPaths(paths),
    reducers: {},
});

export const { reducer: foldersReducer } = foldersSlice;

export const selectFilteredFolders = (query: string) => (store: StoreType) => {
    if (!query) {
        return store.folders;
    }
    return getFilteredFolders(store.folders, query);
};
