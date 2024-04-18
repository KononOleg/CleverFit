import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { Button, Card, Typography } from 'antd';
import cn from 'classnames';

import imgFree from '../../../../assets/images/free.png';
import imgPro from '../../../../assets/images/pro.png';

import styles from './tariff-cards.module.scss';

const Tariffs = [
    { title: 'FREE tarif', image: imgFree, dataTestId: DATA_TEST_ID.FREE_TARIFF_CARD },
    { title: 'PRO tarif', image: imgPro, dataTestId: DATA_TEST_ID.PRO_TARIFF_CARD, forPro: true },
];

type Props = {
    handleOpen: () => void;
    isProUser: boolean;
    month: number;
    day: number;
};

export const TariffCards = ({ handleOpen, isProUser, month, day }: Props) => (
    <React.Fragment>
        <Typography.Title className={styles.title} level={4}>
            Мой тариф
        </Typography.Title>
        <div className={styles.cards}>
            {Tariffs.map(({ title, image, forPro, dataTestId }) => {
                const isShowPro = !isProUser && forPro;

                return (
                    <Card
                        title={title}
                        extra={
                            <Button type='link' onClick={handleOpen}>
                                Подробнее
                            </Button>
                        }
                        key={title}
                        hoverable={false}
                        data-test-id={dataTestId}
                        cover={
                            <div
                                className={cn(styles.cover, {
                                    [styles.inactive]: isShowPro,
                                })}
                            >
                                <img alt={title} src={image} />
                            </div>
                        }
                    >
                        {isShowPro ? (
                            <Button
                                type='primary'
                                data-test-id={DATA_TEST_ID.ACTIVATE_TARIFF_BTN}
                                onClick={handleOpen}
                            >
                                Активировать
                            </Button>
                        ) : (
                            <div className={styles.active}>
                                <Typography.Title level={5}>
                                    активен{' '}
                                    {isProUser &&
                                        title.includes('PRO') &&
                                        ` до ${String(day).padStart(2, '0')}.${String(
                                            month,
                                        ).padStart(2, '0')}`}
                                </Typography.Title>
                                <CheckOutlined />
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    </React.Fragment>
);
