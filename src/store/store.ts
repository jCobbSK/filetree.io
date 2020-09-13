import { configureStore } from '@reduxjs/toolkit';

import { foldersReducer } from './FoldersSlice';
import { saveFolders } from './PersistanceService';

export const store = configureStore({
    reducer: {
        foldersReducer: foldersReducer,
    },
});

store.subscribe(() => {
    saveFolders(store.getState().foldersReducer.folders);
});
export type StoreType = ReturnType<typeof store.getState>;
