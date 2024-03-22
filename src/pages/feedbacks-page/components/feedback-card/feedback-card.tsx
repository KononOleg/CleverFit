import { UserOutlined } from '@ant-design/icons';
import { characterRender } from '@utils/characterRateRender';
import { Avatar, Card, Rate } from 'antd';

import { Feedback } from '../../../../types';
import styles from './feedback-card.module.scss';

export const FeedbackCard = ({ fullName, imageSrc, message, rating, createdAt }: Feedback) => {
    const [name, surName] = fullName?.split(' ') ?? [];

    return (
        <Card bordered={false} className={styles.FeedbackCard}>
            <div className={styles.FeedbackWrapper}>
                <div className={styles.ProfileInfo}>
                    <Avatar size={42} src={imageSrc} icon={<UserOutlined />} />
                    <div>
                        <h6>{name || 'Пользователь'}</h6>
                        <h6>{surName || ''}</h6>
                    </div>
                </div>
                <div className={styles.Description}>
                    <div className={styles.Rating}>
                        <Rate
                            className={styles.Rate}
                            disabled={true}
                            value={rating}
                            character={({ index }) => characterRender(index, rating)}
                        />
                        <span className={styles.Date}>
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className={styles.Message}>{message}</p>
                </div>
            </div>
        </Card>
    );
};
