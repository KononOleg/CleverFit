import { Link } from 'react-router-dom';
import { PATH } from '@constants/index';
import { Button, Typography } from 'antd';

import notFoundImage from '../../assets/images/not-found.png';

import styles from './not-found.module.scss';

export const NotFound = () => (
        <div className={styles.Wrapper}>
            <img className={styles.Image} src={notFoundImage} alt="not-found" />
            <div className={styles.TitleAndDescriptionWrapper}>
                <Typography.Title className={styles.Title} level={3}>
                    Такой страницы нет
                </Typography.Title>
                <Typography.Paragraph className={styles.Description}>
                    Извините, страница не найдена, возможно, она была удалена или перемещена.
                </Typography.Paragraph>
            </div>
            <Button className={styles.Button} type="primary">
                <Link to={PATH.MAIN}>На главную</Link>
            </Button>
        </div>
    );
