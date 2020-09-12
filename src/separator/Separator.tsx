import React, { useCallback, useEffect, useState } from 'react';

import style from './Separator.module.css';

interface Props {
    onWidthChange(newXPosition: number): void;
}

export const Separator: React.FC<Props> = ({ onWidthChange }) => {
    const [isDragging, setIsDragging] = useState(false);
    const handleDragOver = useCallback(
        (event) => {
            if (!isDragging) {
                return;
            }

            onWidthChange(event.clientX);
        },
        [isDragging, onWidthChange],
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
