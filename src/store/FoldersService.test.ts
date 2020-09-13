import {
    getParsedFoldersFromPaths,
    getFilteredFolders,
    getMarkedFolderNameWithQuery,
} from './FoldersService';

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('uuid'),
}));

describe('FoldersService', () => {
    describe('#getParsedFoldersFromPaths()', () => {
        it('returns paths transformed into Folder objects structure', () => {
            const paths = [
                'Movies',
                'Songs/Adele/Hello',
                'Movies/Action',
                'Movies/Comedy/American Pie',
                'Songs/Adele/21',
                'Shows',
            ];

            const folders = getParsedFoldersFromPaths(paths);

            expect(folders).toStrictEqual([
                {
                    id: 'uuid',
                    name: 'Movies',
                    subFolders: [
                        {
                            id: 'uuid',
                            name: 'Action',
                            subFolders: [],
                        },
                        {
                            id: 'uuid',
                            name: 'Comedy',
                            subFolders: [
                                {
                                    id: 'uuid',
                                    name: 'American Pie',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'uuid',
                    name: 'Songs',
                    subFolders: [
                        {
                            id: 'uuid',
                            name: 'Adele',
                            subFolders: [
                                {
                                    id: 'uuid',
                                    name: 'Hello',
                                    subFolders: [],
                                },
                                {
                                    id: 'uuid',
                                    name: '21',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'uuid',
                    name: 'Shows',
                    subFolders: [],
                },
            ]);
        });
    });
    describe('#getFilteredFolders()', () => {
        it('returns filtered folders with accents transformed into folder structure', () => {
            const folders = [
                {
                    id: 'uuid',
                    name: 'Movies',
                    subFolders: [
                        {
                            id: 'uuid',
                            name: 'Action',
                            subFolders: [],
                        },
                        {
                            id: 'uuid',
                            name: 'Comedy',
                            subFolders: [
                                {
                                    id: 'uuid',
                                    name: 'American Pie',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'uuid',
                    name: 'Songs',
                    subFolders: [
                        {
                            id: 'uuid',
                            name: 'Adele',
                            subFolders: [
                                {
                                    id: 'uuid',
                                    name: 'Hëllo',
                                    subFolders: [],
                                },
                                {
                                    id: 'uuid',
                                    name: '21',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'uuid',
                    name: 'Shows',
                    subFolders: [],
                },
            ];

            const filteredFolders = getFilteredFolders(folders, 'he');

            expect(filteredFolders).toStrictEqual([
                {
                    id: 'uuid',
                    name: 'Songs',
                    subFolders: [
                        {
                            id: 'uuid',
                            name: 'Adele',
                            subFolders: [
                                {
                                    id: 'uuid',
                                    name: 'Hëllo',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
            ]);
        });
    });

    describe('#getMarkedFolderNameWithQuery()', () => {
        it('returns folder name if query is empty string', () => {
            const markedName = getMarkedFolderNameWithQuery('Adele', '');

            expect(markedName).toBe('Adele');
        });

        it('returns folder name if query is not present in name', () => {
            const markedName = getMarkedFolderNameWithQuery('Adele', 'b');

            expect(markedName).toBe('Adele');
        });

        it('returns folder name with marked positions of query', () => {
            const markedName = getMarkedFolderNameWithQuery('Adele', 'e');

            expect(markedName).toBe('Ad<mark>e</mark>l<mark>e</mark>');
        });
    });
});
