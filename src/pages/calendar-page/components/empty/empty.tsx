import EmptyImage from '../../../../assets/icons/empty-image.png';

import styles from './empty.module.scss';

export const Empty = () => (
    <div className={styles.emptyWrapper}>
        <img className={styles.emptyImage} src={EmptyImage} alt='EmptyImage' />
    </div>
);
