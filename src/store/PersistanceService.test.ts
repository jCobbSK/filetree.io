import { saveFolders, loadFolders } from './PersistanceService';

const folders = [{ id: 'uuid', name: 'name', subFolders: [] }];

describe('PersistanceService', () => {
    describe('#saveFolders()', () => {
        it('sets stringified folders into local storage', () => {
            saveFolders(folders);

            expect(localStorage.getItem('folders')).toBe(JSON.stringify(folders));
        });
    });

    describe('#loadFolders()', () => {
        it('returns parsed folders from localstorage if present', () => {
            localStorage.setItem('folders', JSON.stringify(folders));

            const loadedFolders = loadFolders();

            expect(loadedFolders).toStrictEqual(folders);
        });

        it('returns undefined when nothing in localstorage', () => {
            localStorage.clear();

            const loadedFolders = loadFolders();

            expect(loadedFolders).toBeUndefined();
        });
    });
});
