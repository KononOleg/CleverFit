import { useGetFeedbacksQuery } from '@redux/services/feedback-service';
import { NoFeedbacks } from './components/no-feedbacks';
import classNames from 'classnames';
import { FeedbackCard } from './components/feedback-card';
import Button from 'antd/lib/button';
import { useState } from 'react';

import styles from './feedbacks-page.module.scss';

export const FeedbacksPage = () => {
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);
    const { data: feedbacks = [], isFetching } = useGetFeedbacksQuery();

    const showAllFeedbacks = () => setIsAllFeedbacks(!isAllFeedbacks);

    return (
        <>
            {!isFetching &&
                (feedbacks && feedbacks.length === 0 ? (
                    <NoFeedbacks />
                ) : (
                    <div className={styles.FeedbacksWrapper}>
                        <div
                            className={classNames(styles.Feedbacks, {
                                [styles.FeedbacksAll]: isAllFeedbacks,
                            })}
                        >
                            {[...feedbacks]
                                ?.sort(
                                    (a, b) =>
                                        new Date(b.createdAt).getTime() -
                                        new Date(a.createdAt).getTime(),
                                )
                                ?.slice(0, isAllFeedbacks ? -1 : 4)
                                .map((feedback) => (
                                    <FeedbackCard key={feedback.id} {...feedback} />
                                ))}
                        </div>
                        <div className={styles.Buttons}>
                            <Button type='primary'>Написать отзыв</Button>
                            <Button type='link' onClick={showAllFeedbacks}>
                                {isAllFeedbacks ? 'Свернуть отзывы' : 'Развернуть все отзывы'}
                            </Button>
                        </div>
                    </div>
                ))}
        </>
    );
};
