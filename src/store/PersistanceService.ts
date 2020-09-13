import { Folder } from './FoldersService';

const LOCAL_STORAGE_KEY = 'folders';

export function loadFolders(): Folder[] | undefined {
    const stringifiedFolders = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stringifiedFolders) {
        return JSON.parse(stringifiedFolders);
    }
    return undefined;
}
export function saveFolders(folders: Folder[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(folders));
}
