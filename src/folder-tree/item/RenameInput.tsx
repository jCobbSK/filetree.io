import React, { useCallback, useState } from 'react';

import style from './RenameInput.module.css';

interface Props {
    name: string;
    onConfirm(newName: string): void;
}

export const RenameInput: React.FC<Props> = ({ name, onConfirm }) => {
    const [newName, setNewName] = useState(name);
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewName(event.target.value);
        },
        [setNewName],
    );
    const handleConfirm = useCallback(() => {
        onConfirm(newName);
    }, [onConfirm, newName]);

    return (
        <form onSubmit={handleConfirm} className={style.Form}>
            <input
                data-cy="rename-folder-input"
                type="text"
                required
                autoFocus
                value={newName}
                onChange={handleChange}
                onBlur={handleConfirm}
            />
        </form>
    );
};
