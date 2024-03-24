import { Button, Card, Typography } from 'antd';
import cn from 'classnames';
import imgFree from '../../../../assets/images/free.png';
import imgPro from '../../../../assets/images/pro.png';

import styles from './tariff-cards.module.scss';
import { CheckOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';

const Tariffs = [
    { title: 'FREE tarif', image: imgFree, dataTestId: DATA_TEST_ID.FREE_TARIFF_CARD },
    { title: 'PRO tarif', image: imgPro, dataTestId: DATA_TEST_ID.PRO_TARIFF_CARD, forPro: true },
];

type Props = {
    handleOpen: () => void;
};

export const TariffCards = ({ handleOpen }: Props) => {
    const isProUser = false;

    return (
        <>
            <Typography.Title className={styles.Title} level={4}>
                Мой тариф
            </Typography.Title>
            <div className={styles.Cards}>
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
                                    className={cn(styles.Cover, {
                                        [styles.Inactive]: isShowPro,
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
                                >
                                    Активировать
                                </Button>
                            ) : (
                                <div className={styles.Active}>
                                    <Typography.Title level={5}>активен</Typography.Title>
                                    <CheckOutlined />
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </>
    );
};
