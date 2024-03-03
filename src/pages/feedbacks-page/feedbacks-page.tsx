import { ModalError } from '@components/modal-error';
import { DATA_TEST_ID } from '@constants/index';
import { useGetFeedbacksQuery } from '@redux/services/feedback-service';
import Button from 'antd/lib/button';
import classNames from 'classnames';
import { useState } from 'react';

import { FeedbackCard } from './components/feedback-card';
import { ModalFeedback } from './components/modal-feedback';
import { NoFeedbacks } from './components/no-feedbacks';
import styles from './feedbacks-page.module.scss';

export const FeedbacksPage = () => {
    const [openNewFeedback, setOpenNewFeedback] = useState(false);
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);
    const { data: feedbacks = [], isFetching, isError, refetch } = useGetFeedbacksQuery();

    const isSuccessFetching = !isFetching && !isError;
    const isEmptyFeedbacks = feedbacks && feedbacks.length === 0;

    const showAllFeedbacks = () => setIsAllFeedbacks(!isAllFeedbacks);
    const handleOpenNewFeedback = () => setOpenNewFeedback(true);
    const handleRefetch = () => refetch();

    return (
        <>
            {isSuccessFetching &&
                (isEmptyFeedbacks ? (
                    <NoFeedbacks handleOpenNewFeedback={handleOpenNewFeedback} />
                ) : (
                    <div className={styles.FeedbacksWrapper}>
                        <div
                            className={classNames(styles.Feedbacks, {
                                [styles.FeedbacksAll]: isAllFeedbacks,
                            })}
                        >
                            {feedbacks
                                .slice(0, isAllFeedbacks ? feedbacks.length : 4)
                                .map((feedback) => (
                                    <FeedbackCard key={feedback.id} {...feedback} />
                                ))}
                        </div>
                        <div className={styles.Buttons}>
                            <Button
                                type='primary'
                                onClick={handleOpenNewFeedback}
                                data-test-id={DATA_TEST_ID.WRITE_REVIEW}
                            >
                                Написать отзыв
                            </Button>
                            <Button
                                type='link'
                                onClick={showAllFeedbacks}
                                data-test-id={DATA_TEST_ID.ALL_REVIEWS_BUTTON}
                            >
                                {isAllFeedbacks ? 'Свернуть отзывы' : 'Развернуть все отзывы'}
                            </Button>
                        </div>
                    </div>
                ))}

            <ModalFeedback
                open={openNewFeedback}
                setOpen={setOpenNewFeedback}
                handleRefetch={handleRefetch}
            />
            <ModalError isError={isError} />
        </>
    );
};
