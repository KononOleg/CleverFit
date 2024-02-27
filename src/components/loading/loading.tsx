import { DATA_TEST_ID } from '@constants/index';
import Lottie from 'lottie-react';

import animationData from '../../assets/icons/loader.json';
import styles from './loading.module.scss';

export const Loading = () => (
    <div className={styles.loadingWrapper} data-test-id={DATA_TEST_ID.LOADER}>
        <Lottie loop={true} autoPlay={true} animationData={animationData} />
    </div>
);
