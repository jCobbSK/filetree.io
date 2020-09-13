import { configureStore } from '@reduxjs/toolkit';

import { foldersReducer } from './FoldersSlice';

export const store = configureStore({
    reducer: {
        folders: foldersReducer,
    },
});
export type StoreType = ReturnType<typeof store.getState>;
