import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { PATH } from '@constants/index';

import styles from './main-page.module.scss';
import { useEffect } from 'react';
import { useGetTrainingQuery } from '@redux/services/training-service';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setTraining } from '@redux/reducers/training-slice';
import { ModalError } from '@components/modal-error';

export const MainPage = () => {
    const dispatch = useAppDispatch();

    const { data: training, isError } = useGetTrainingQuery();

    useEffect(() => {
        if (training) dispatch(setTraining({ training }));
    }, [training, dispatch]);

    return (
        <>
            {' '}
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
                        <Button type='text' icon={<CalendarOutlined />}>
                            <Link to={PATH.CALENDAR}> Календарь</Link>
                        </Button>
                    </div>

                    <div>
                        <p>Заполнить профиль</p>
                        <Button type='text' icon={<IdcardOutlined />}>
                            Профиль
                        </Button>
                    </div>
                </div>
            </div>
            <ModalError isError={isError} />
        </>
    );
};
