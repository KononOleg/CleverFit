import { FC, Fragment } from 'react';

import styles from './highlighter.module.scss';

type Props = {
    text: string;
    searchValue: string;
};

export const Highlighter: FC<Props> = ({ text, searchValue }) => {
    if (!searchValue) return <span>{text}</span>;

    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));

    return (
        <Fragment>
            {parts.map((part, index) => (
                <span key={`${index.toString()}:${part}`}>
                    {part.toLowerCase() === searchValue.toLowerCase() ? (
                        <span className={styles.highlightText}>{part}</span>
                    ) : (
                        part
                    )}
                </span>
            ))}
        </Fragment>
    );
};
