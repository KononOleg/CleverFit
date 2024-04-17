import { DATA_TEST_ID } from '@constants/index';
import Button from 'antd/lib/button';

import styles from './no-feedbacks.module.scss';

type Props = {
    handleOpenNewFeedback: () => void;
};

export const NoFeedbacks = ({ handleOpenNewFeedback }: Props) => (
    <div className={styles.noFeedbacksWrapper}>
        <div className={styles.noFeedbacks}>
            <h3 className={styles.title}>Оставьте свой отзыв первым</h3>
            <p className={styles.subTitle}>
                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                своим мнением и опытом с другими пользователями, и помогите им сделать правильный
                выбор.
            </p>
        </div>
        <Button
            type='primary'
            onClick={handleOpenNewFeedback}
            data-test-id={DATA_TEST_ID.WRITE_REVIEW}
        >
            Написать отзыв
        </Button>
    </div>
);
