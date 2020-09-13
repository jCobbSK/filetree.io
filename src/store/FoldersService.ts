import ASCIIFolder from '@pexxi/fold-to-ascii-ts';
import { v4 as uuidv4 } from 'uuid';

export interface Folder {
    id: string;
    name: string;
    subFolders: Folder[];
}

const SEPARATOR = '/';
const HIGHLIGHTER = {
    START: '<mark>',
    END: '</mark>',
};

export function createFolder(name: string): Folder {
    return {
        id: uuidv4(),
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

function doesFitQuery(folderName: string, query: string): boolean {
    return ASCIIFolder.foldMaintaining(folderName).toLowerCase().includes(query);
}

const folderMatchMap = (query: string) => (folder: Folder): Folder | undefined => {
    if (doesFitQuery(folder.name, query)) {
        return folder;
    }

    const subFolders = folder.subFolders
        .map(folderMatchMap(query))
        .filter((folder) => !!folder) as Folder[];
    if (!subFolders.length) {
        return undefined;
    }
    return {
        ...folder,
        subFolders,
    };
};

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

export function getParsedFoldersFromPaths(paths: string[]): Folder[] {
    return paths.reduce<Folder[]>(addPath, []);
}

export function getFilteredFolders(folders: Folder[], query: string): Folder[] {
    return folders.map(folderMatchMap(query)).filter((folder) => !!folder) as Folder[];
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

const findFolderReducer = (id: string) => (
    foundFolder: Folder | undefined,
    folder: Folder,
): Folder | undefined => {
    if (foundFolder) {
        return foundFolder;
    }
    if (folder.id === id) {
        return folder;
    }

    return folder.subFolders.reduce(findFolderReducer(id), undefined);
};

export function findFolderById(folders: Folder[], id: string): Folder | undefined {
    return folders.reduce(findFolderReducer(id), undefined);
}

const isFolderOfIdFilter = (id: string) => (folder: Folder): boolean => {
    return folder.id === id;
};

const getFolderWithoutIdReducer = (id: string) => (folders: Folder[], folder: Folder): Folder[] => {
    if (isFolderOfIdFilter(id)(folder)) {
        return folders;
    }
    const newFolder = {
        ...folder,
        subFolders: folder.subFolders.reduce(getFolderWithoutIdReducer(id), []),
    };

    return [...folders, newFolder];
};

export function getFoldersWithoutFolderWithId(folders: Folder[], id: string): Folder[] {
    return folders.reduce(getFolderWithoutIdReducer(id), []);
}
