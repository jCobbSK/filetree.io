import ASCIIFolder from '@pexxi/fold-to-ascii-ts';

export interface Folder {
    name: string;
    subFolders: Folder[];
}

const SEPARATOR = '/';
const HIGHLIGHTER = {
    START: '<mark>',
    END: '</mark>',
};

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

function doesFitQuery(folderName: string, query: string): boolean {
    return ASCIIFolder.foldMaintaining(folderName).toLowerCase().includes(query);
}

function getQueryOccuranceIndexes(folderName: string, query: string): number[] {
    const foldedFolderName = ASCIIFolder.foldMaintaining(folderName).toLowerCase();
    const result = [];
    let index = foldedFolderName.indexOf(query);
    while (index !== -1) {
        result.push(index);
        index = foldedFolderName.indexOf(query, index + 1);
    }
    return result;
}

const getFolderNameFilter = (query: string) => {
    let alreadyFound = false;
    return (folderName: string): boolean => {
        alreadyFound = doesFitQuery(folderName, query) || alreadyFound;
        return alreadyFound;
    };
};

const getPathTransformer = (query: string) => (path: string): string[] => {
    return splitPath(path).reverse().filter(getFolderNameFilter(query)).reverse();
};

function getFilteredPaths(paths: string[], query: string): string[] {
    return paths
        .map(getPathTransformer(query))
        .filter((path) => !!path.length)
        .map(joinPath);
}

export function getFolders(paths: string[], query: string): Folder[] {
    const filteredPaths = query ? getFilteredPaths(paths, query.toLowerCase()) : paths;
    return filteredPaths.reduce<Folder[]>(addPath, []);
}

export function getMarkedFolderNameWithQuery(folderName: string, query: string): string {
    if (!query) {
        return folderName;
    }
    const queryStartIndexes = getQueryOccuranceIndexes(folderName, query);
    const queryLength = query.length;
    const queryEndIndexes = queryStartIndexes.map((index) => index + queryLength);
    if (!queryStartIndexes.length) {
        return folderName;
    }

    return [...folderName.split(''), ''].reduce<string>(
        (result, folderCharacter, folderNameIndex) => {
            if (queryStartIndexes.includes(folderNameIndex)) {
                return `${result}${HIGHLIGHTER.START}${folderCharacter}`;
            }
            if (queryEndIndexes.includes(folderNameIndex)) {
                return `${result}${HIGHLIGHTER.END}${folderCharacter}`;
            }
            return `${result}${folderCharacter}`;
        },
        '',
    );
}
