import { renderHook, act } from '@testing-library/react-hooks';

import { useFolderItem } from './useFolderItem';
import { useMenuActions } from './menu/useMenuActions';

jest.mock('./menu/useMenuActions', () => ({
    useMenuActions: jest.fn().mockReturnValue({
        renameFolder: jest.fn(),
    }),
}));

describe('useFolderItem', () => {
    it('returns default values', () => {
        const { result } = renderHook(() => useFolderItem('uuid'));

        expect(result.current).toEqual({
            isRenaming: false,
            isMenuVisible: false,
            isMenuIconVisible: false,
            onMenuIconClick: expect.any(Function),
            onHover: expect.any(Function),
            onHoverOut: expect.any(Function),
            onMenuItemClick: expect.any(Function),
            onRename: expect.any(Function),
            onRenameMenuItemClick: expect.any(Function),
        });
    });

    it('hover makes menu icon visible', () => {
        const { result } = renderHook(() => useFolderItem('uuid'));

        act(() => {
            result.current.onHover();
        });

        expect(result.current.isMenuIconVisible).toBe(true);
    });

    it('hover out makes menu icon hidden', () => {
        const { result } = renderHook(() => useFolderItem('uuid'));

        act(() => {
            result.current.onHover();
        });

        expect(result.current.isMenuIconVisible).toBe(true);

        act(() => {
            result.current.onHoverOut();
        });

        expect(result.current.isMenuIconVisible).toBe(false);
    });

    it('menu icon click makes menu visible', () => {
        const { result } = renderHook(() => useFolderItem('uuid'));

        act(() => {
            result.current.onMenuIconClick();
        });

        expect(result.current.isMenuVisible).toBe(true);
    });

    it('menu item click hides menu', () => {
        const { result } = renderHook(() => useFolderItem('uuid'));
        act(() => {
            result.current.onMenuIconClick();
        });

        expect(result.current.isMenuVisible).toBe(true);

        act(() => {
            result.current.onMenuItemClick();
        });

        expect(result.current.isMenuVisible).toBe(false);
    });

    it('on menu item click makes rename input visible', () => {
        const { result } = renderHook(() => useFolderItem('uuid'));

        act(() => {
            result.current.onRenameMenuItemClick();
        });

        expect(result.current.isRenaming).toBe(true);
    });

    it('on rename with not empty new name renames folder', () => {
        const renameFolderMock = jest.fn();
        (useMenuActions as jest.Mock).mockReturnValueOnce({
            renameFolder: renameFolderMock,
        });
        const { result } = renderHook(() => useFolderItem('uuid'));

        act(() => {
            result.current.onRename('new name');
        });

        expect(result.current.isRenaming).toBe(false);
        expect(renameFolderMock).toHaveBeenCalledWith('new name');
    });
});
