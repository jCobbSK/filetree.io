import React, { useCallback, useEffect, useState, useRef } from 'react';
import debounce from 'lodash/debounce';

import style from './Separator.module.css';

interface Props {
    onWidthChange(newXPosition: number): void;
}

const DEBOUNCE_TIMEOUT = 10;

export const Separator: React.FC<Props> = ({ onWidthChange }) => {
    const [isDragging, setIsDragging] = useState(false);
    const debouncedWidthChange = useRef(
        debounce((newWidth: number) => onWidthChange(newWidth), DEBOUNCE_TIMEOUT),
    ).current;

    const handleDragOver = useCallback(
        (event) => {
            if (!isDragging) {
                return;
            }

            debouncedWidthChange(event.clientX);
        },
        [isDragging, debouncedWidthChange],
    );

    useEffect(() => {
        window.addEventListener('dragover', handleDragOver);
        return () => {
            window.removeEventListener('dragover', handleDragOver);
        };
    }, [handleDragOver]);

    return (
        <div
            className={style.separator}
            data-cy="content-separator"
            draggable
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
        />
    );
};
