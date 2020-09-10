export interface Folder {
    name: string;
    subFolders: Folder[];
}

const SEPARATOR = '/';

function createFolder(name: string): Folder {
    return {
        name,
        subFolders: [],
    };
}

function extractFirstFolderName(path: string): string[] {
    const [folderName, ...rest] = path.split(SEPARATOR);
    if (rest.length) {
        return [folderName, rest.join(SEPARATOR)];
    }
    return [folderName];
}

function getFolderByName(folders: Folder[], searchName?: string): Folder | undefined {
    if (searchName === undefined) {
        return undefined;
    }
    return folders.find(({ name }) => name === searchName);
}

function addPath(folders: Folder[], path?: string): Folder[] {
    if (path === undefined) {
        return folders;
    }
    const [folderName, nextPath] = extractFirstFolderName(path);
    const folder = getFolderByName(folders, folderName);
    if (folder) {
        addPath(folder.subFolders, nextPath);
        return folders;
    }
    const newFolder = createFolder(folderName);
    folders.push(newFolder);
    addPath(newFolder.subFolders, nextPath);
    return folders;
}

export function getFolders(paths: string[]): Folder[] {
    return paths.reduce<Folder[]>(addPath, []);
}
