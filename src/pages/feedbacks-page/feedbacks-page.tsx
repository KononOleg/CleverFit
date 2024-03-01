import { useGetFeedbacksQuery } from '@redux/services/feedback-service';
import { NoFeedbacks } from './components/no-feedbacks';
import classNames from 'classnames';
import { FeedbackCard } from './components/feedback-card';
import Button from 'antd/lib/button';
import { useState } from 'react';
import { ModalFeedback } from './components/modal-feedback';
import { DATA_TEST_ID } from '@constants/index';
import { ModalError } from '@components/modal-error';

import styles from './feedbacks-page.module.scss';

export const FeedbacksPage = () => {
    const [openNewFeedback, setOpenNewFeedback] = useState(false);
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);
    const { data: feedbacks = [], isFetching, isError, refetch } = useGetFeedbacksQuery();

    const showAllFeedbacks = () => setIsAllFeedbacks(!isAllFeedbacks);
    const handleOpenNewFeedback = () => setOpenNewFeedback(true);
    const handleRefetch = () => refetch();

    return (
        <>
            {!isFetching &&
                !isError &&
                (feedbacks && feedbacks.length === 0 ? (
                    <NoFeedbacks handleOpenNewFeedback={handleOpenNewFeedback} />
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
