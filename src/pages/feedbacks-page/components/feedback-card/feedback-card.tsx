import { UserOutlined } from '@ant-design/icons';
import { characterRender } from '@utils/character-rate-render';
import { Avatar, Card, Rate } from 'antd';

import { Feedback } from '../../../../types';

import styles from './feedback-card.module.scss';

export const FeedbackCard = ({ fullName, imageSrc, message, rating, createdAt }: Feedback) => {
    const [name, surName] = fullName?.split(' ') ?? [];

    return (
        <Card bordered={false} className={styles.feedbackCard}>
            <div className={styles.feedbackWrapper}>
                <div className={styles.profileInfo}>
                    <Avatar size={42} src={imageSrc} icon={<UserOutlined />} />
                    <div>
                        <h6>{name || 'Пользователь'}</h6>
                        <h6>{surName || ''}</h6>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.rating}>
                        <Rate
                            className={styles.rate}
                            disabled={true}
                            value={rating}
                            character={({ index }) => characterRender(index, rating)}
                        />
                        <span className={styles.date}>
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className={styles.message}>{message}</p>
                </div>
            </div>
        </Card>
    );
};
