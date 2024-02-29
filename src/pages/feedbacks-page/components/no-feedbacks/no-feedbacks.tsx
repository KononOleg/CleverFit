import Button from 'antd/lib/button';

import styles from './no-feedbacks.module.scss';

export const NoFeedbacks = () => (
    <div className={styles.NoFeedbacksWrapper}>
        <div className={styles.NoFeedbacks}>
            <h3 className={styles.Title}>Оставьте свой отзыв первым</h3>
            <p className={styles.SubTitle}>
                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                своим мнением и опытом с другими пользователями, и помогите им сделать правильный
                выбор.
            </p>
        </div>
        <Button type='primary'>Написать отзыв</Button>
    </div>
);
