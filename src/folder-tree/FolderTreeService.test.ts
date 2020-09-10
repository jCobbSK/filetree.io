import { getFolders } from './FolderTreeService';

describe('FolderTreeService', () => {
    describe('#getFolders()', () => {
        it('returns paths transformed into Folder objects structure', () => {
            const paths = [
                'Movies',
                'Songs/Adele/Hello',
                'Movies/Action',
                'Movies/Comedy/American Pie',
                'Songs/Adele/21',
                'Shows',
            ];

            const folders = getFolders(paths, '');

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

        it('returns filtered paths with accents transformed into folder structure', () => {
            const paths = [
                'Movies',
                'Songs/Adële/Hello',
                'Movies/Action',
                'Movies/Comedy/American Pie',
                'Songs/Adele/21',
                'Shows',
            ];

            const folders = getFolders(paths, 'ade');

            expect(folders).toStrictEqual([
                {
                    name: 'Songs',
                    subFolders: [
                        {
                            name: 'Adële',
                            subFolders: [],
                        },
                        {
                            name: 'Adele',
                            subFolders: [],
                        },
                    ],
                },
            ]);
        });
    });
});