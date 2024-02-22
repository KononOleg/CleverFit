import React from 'react';
import Lottie from 'lottie-react';

import animationData from '../../assets/icons/loader.json';

import styles from './loading.module.scss';

export const Loading: React.FC = () => {
    return (
        <div className={styles.loadingWrapper}>
            <Lottie loop={true} autoPlay={true} animationData={animationData} />
        </div>
    );
};
