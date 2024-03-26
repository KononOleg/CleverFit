import EmptyImage from '../../../../assets/icons/empty-image.png';

import styles from './empty.module.scss';

export const Empty = () => (
    <div className={styles.EmptyWrapper}>
        <img className={styles.EmptyImage} src={EmptyImage} alt='EmptyImage' />
    </div>
);
