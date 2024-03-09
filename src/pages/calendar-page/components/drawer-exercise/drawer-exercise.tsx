import { Button, Drawer, Input, InputNumber } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './drawer-exercise.module.scss';

import moment from 'moment';
import { BadgeCustom } from '../badge-custom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';

type Props = { openDrawerExercises: boolean; closeDrawerExercisesHandler: () => void };

export const DrawerExercise = ({ openDrawerExercises, closeDrawerExercisesHandler }: Props) => {
    const { selectedDate } = useAppSelector(trainingSelector);

    return (
        <Drawer
            title='Добавление упражнений'
            destroyOnClose={true}
            placement='right'
            closeIcon={<PlusOutlined />}
            open={openDrawerExercises}
            className={styles.DrawerExercises}
            extra={
                <Button
                    type='text'
                    size='small'
                    icon={<CloseOutlined />}
                    onClick={closeDrawerExercisesHandler}
                />
            }
        >
            <div className={styles.Status}>
                <BadgeCustom text='Силовая' />
                <p>{moment(selectedDate).format('DD.MM.YYYY')}</p>
            </div>
            <div className={styles.Exercises}>
                <Input className={styles.Input} placeholder='Упражнениe' />
                <div className={styles.Wrapper}>
                    <div className={styles.LabelReplays}>Подходы</div>
                    <div className={styles.InputWrapper}>
                        <div className={styles.Label}>Вес, кг</div>
                        <div className={styles.Label}>Количество</div>
                    </div>
                </div>
                <div className={styles.Wrapper}>
                    <InputNumber className={styles.InputReplays} addonBefore='+' min={1} />
                    <div className={styles.InputWrapper}>
                        <InputNumber className={styles.Input} />
                        <PlusOutlined className={styles.Multi} />
                        <InputNumber className={styles.Input} min={1} />
                    </div>
                </div>

                <div className={styles.Buttons}>
                    <Button type='link' icon={<PlusOutlined />} size='small'>
                        Добавить ещё
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};
