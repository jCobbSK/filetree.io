import React, { useCallback } from 'react';

import style from './SearchInput.module.css';
import { Icon, IconType } from '../icon/Icon';

interface Props {
    value: string;
    onChange(value: string): void;
}

export const SearchInput: React.FC<Props> = ({ value, onChange }) => {
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
        },
        [onChange],
    );

    return (
        <div className={style.inputWrapper}>
            <Icon type={IconType.MIRROR} className={style.icon} />
            <input
                type="text"
                onChange={handleChange}
                value={value}
                placeholder="Search"
                data-cy="search-input"
                className={style.input}
            />
        </div>
    );
};
