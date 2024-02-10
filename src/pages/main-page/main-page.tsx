import React from 'react';

import { Header } from '@components/header';

import styles from './main-page.module.scss';
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Footer } from '@components/footer';

export const MainPage: React.FC = () => {
    return (
        <div className={styles.mainPage}>
            <div className={styles.sider}></div>
            <div className={styles.wrapper}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.card}>
                        <span>С CleverFit ты сможешь:</span>
                        <ul>
                            <li>
                                планировать свои тренировки на календаре, выбирая тип и уровень
                                нагрузки;
                            </li>
                            <li>
                                отслеживать свои достижения в разделе статистики, сравнивая свои
                                результаты с нормами и рекордами;
                            </li>
                            <li>
                                создавать свой профиль, где ты можешь загружать свои фото, видео и
                                отзывы о тренировках;
                            </li>
                            <li>
                                выполнять расписанные тренировки для разных частей тела, следуя
                                подробным инструкциям и советам профессиональных тренеров.
                            </li>
                        </ul>
                    </div>
                    <div className={styles.card}>
                        <h4>
                            CleverFit — это не просто приложение, а твой личный помощник в мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </h4>
                    </div>
                    <div className={styles.cards}>
                        <div>
                            <p>Расписать тренировки</p>
                            <Button type='text' icon={<HeartOutlined />}>
                                Тренировки
                            </Button>
                        </div>

                        <div>
                            <p>Расписать тренировки</p>
                            <Button type='text' icon={<HeartOutlined />}>
                                Настройки
                            </Button>
                        </div>

                        <div>
                            <p>Расписать тренировки</p>
                            <Button type='text' icon={<HeartOutlined />}>
                                Настройки
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};
