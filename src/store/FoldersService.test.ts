import {
    getParsedFoldersFromPaths,
    getFilteredFolders,
    getMarkedFolderNameWithQuery,
} from './FoldersService';

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
                    name: 'Movies',
                    subFolders: [
                        {
                            name: 'Action',
                            subFolders: [],
                        },
                        {
                            name: 'Comedy',
                            subFolders: [
                                {
                                    name: 'American Pie',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Songs',
                    subFolders: [
                        {
                            name: 'Adele',
                            subFolders: [
                                {
                                    name: 'Hello',
                                    subFolders: [],
                                },
                                {
                                    name: '21',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
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
                    name: 'Movies',
                    subFolders: [
                        {
                            name: 'Action',
                            subFolders: [],
                        },
                        {
                            name: 'Comedy',
                            subFolders: [
                                {
                                    name: 'American Pie',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Songs',
                    subFolders: [
                        {
                            name: 'Adele',
                            subFolders: [
                                {
                                    name: 'Hëllo',
                                    subFolders: [],
                                },
                                {
                                    name: '21',
                                    subFolders: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Shows',
                    subFolders: [],
                },
            ];

            const filteredFolders = getFilteredFolders(folders, 'he');

            expect(filteredFolders).toStrictEqual([
                {
                    name: 'Songs',
                    subFolders: [
                        {
                            name: 'Adele',
                            subFolders: [
                                {
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
