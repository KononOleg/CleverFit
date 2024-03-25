import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { ModalError } from '@components/modal-error';
import { DATA_TEST_ID, PATH } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setTraining } from '@redux/reducers/training-slice';
import { useLazyGetTrainingQuery } from '@redux/services/training-service';
import { Button } from 'antd';
import cn from 'classnames';

import styles from './main-page.module.scss';

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [getTraining, { data: training, isError }] = useLazyGetTrainingQuery();

    const onNavigate = () => getTraining();

    useEffect(() => {
        if (training) {
            dispatch(setTraining(training));
            navigate(PATH.CALENDAR);
        }
    }, [dispatch, navigate, training]);

    return (
        <React.Fragment>
            <div className={styles.mainPage}>
                <div className={styles.about}>
                    <div className={cn(styles.card, styles.goals)}>
                        <p>С CleverFit ты сможешь:</p>
                        <p>
                            — планировать свои тренировки на календаре, выбирая тип и уровень
                            нагрузки;
                        </p>
                        <p>
                            — отслеживать свои достижения в разделе статистики, сравнивая свои
                            результаты с нормами и рекордами;
                        </p>
                        <p>
                            — создавать свой профиль, где ты можешь загружать свои фото, видео и
                            отзывы о тренировках;
                        </p>
                        <p>
                            — выполнять расписанные тренировки для разных частей тела, следуя
                            подробным инструкциям и советам профессиональных тренеров.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <h4>
                            CleverFit — это не просто приложение, а твой личный помощник в мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </h4>
                    </div>
                </div>

                <div className={styles.cards}>
                    <div>
                        <p>Расписать тренировки</p>
                        <Button type='text' icon={<HeartFilled />}>
                            Тренировки
                        </Button>
                    </div>

                    <div>
                        <p>Назначить календарь</p>
                        <Button
                            type='text'
                            icon={<CalendarOutlined />}
                            data-test-id={DATA_TEST_ID.MENU_BUTTON_CALENDAR}
                            onClick={onNavigate}
                        >
                            Календар
                        </Button>
                    </div>

                    <div>
                        <p>Заполнить профиль</p>
                        <Button
                            type='text'
                            icon={<IdcardOutlined />}
                            data-test-id={DATA_TEST_ID.MENU_BUTTON_PROFILE}
                        >
                            <Link to={PATH.PROFILE}>Профиль</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <ModalError isError={isError} />
        </React.Fragment>
    );
};
