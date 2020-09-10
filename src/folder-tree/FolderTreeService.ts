import ASCIIFolder from '@pexxi/fold-to-ascii-ts';

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

function splitPath(path: string): string[] {
    return path.split(SEPARATOR);
}

function joinPath(path: string[]): string {
    return path.join(SEPARATOR);
}

function doesFitQuery(folderName: string, query: string) {
    return ASCIIFolder.foldMaintaining(folderName).toLowerCase().includes(query);
}

const getFolderNameMatcher = (query: string) => {
    let alreadyFound = false;
    return (folderName: string) => {
        const matches = doesFitQuery(folderName, query);
        alreadyFound = matches || alreadyFound;
        return alreadyFound || matches;
    };
};

const getPathTransformer = (query: string) => (path: string): string[] => {
    return splitPath(path).reverse().filter(getFolderNameMatcher(query)).reverse();
};

function getFilteredPaths(paths: string[], query: string): string[] {
    return paths
        .map(getPathTransformer(query))
        .filter((path) => !!path.length)
        .map(joinPath);
}

export function getFolders(paths: string[], query: string): Folder[] {
    const filteredPaths = getFilteredPaths(paths, query.toLowerCase());
    return filteredPaths.reduce<Folder[]>(addPath, []);
}
