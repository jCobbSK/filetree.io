import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';

import { useMenuActions } from './useMenuActions';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

const dispatchMock = jest.fn();
(useDispatch as jest.Mock).mockReturnValue(dispatchMock);

describe('useMenuActions', () => {
    beforeEach(() => {
        dispatchMock.mockClear();
    });

    it('returns addChild which dispatches addchild action', () => {
        const callbackMock = jest.fn();
        const { result } = renderHook(() => useMenuActions('uuid', callbackMock));

        result.current.addChild();

        expect(callbackMock).toHaveBeenCalledWith();
        expect(dispatchMock).toHaveBeenCalledWith({
            payload: 'uuid',
            type: 'folders/addChild',
        });
    });
    it('returns deleteFolder which dispatches removeFolder action', () => {
        const callbackMock = jest.fn();
        const { result } = renderHook(() => useMenuActions('uuid', callbackMock));

        result.current.deleteFolder();

        expect(callbackMock).toHaveBeenCalledWith();
        expect(dispatchMock).toHaveBeenCalledWith({
            payload: 'uuid',
            type: 'folders/removeFolder',
        });
    });
    it('returns renameFolder which dispatches renameFolder action', () => {
        const callbackMock = jest.fn();
        const { result } = renderHook(() => useMenuActions('uuid', callbackMock));

        result.current.renameFolder('new name');

        expect(callbackMock).toHaveBeenCalledWith();
        expect(dispatchMock).toHaveBeenCalledWith({
            payload: {
                id: 'uuid',
                newName: 'new name',
            },
            type: 'folders/renameFolder',
        });
    });
});
