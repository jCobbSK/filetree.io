import React from 'react';

import style from './Content.module.css';

export const Content: React.FC = () => {
    return (
        <section className={style.content} data-cy="content">
            Hello World!
        </section>
    );
};
