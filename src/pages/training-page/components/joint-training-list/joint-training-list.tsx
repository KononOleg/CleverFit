import { ArrowLeftOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { Button, Input, List } from 'antd';

import { UserJointTrainig } from '../../../../types';
import { JointTrainingCard } from '../joint-training-card';

import styles from './joint-training-list.module.scss';

type Props = {
    goBackHandler: () => void;
    onChangeTrainingHandler: (partner: UserJointTrainig) => void;
};

export const JointTrainingList = ({ goBackHandler, onChangeTrainingHandler }: Props) => {
    const { userJointTrainigList } = useAppSelector(inviteSelector);

    return (
        <div className={styles.JointTrainingList}>
            <div className={styles.Searhing} data-test-id={DATA_TEST_ID.SEARCH_INPUT}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type='text'
                    className={styles.BackButton}
                    onClick={goBackHandler}
                >
                    Назад
                </Button>
                <Input.Search placeholder='Поиск по имени' className={styles.SearhInput} />
            </div>
            <List
                dataSource={userJointTrainigList}
                renderItem={(partner, index) => (
                    <JointTrainingCard
                        partner={partner}
                        index={index}
                        onChangeTrainingHandler={onChangeTrainingHandler}
                    />
                )}
                className={styles.JointList}
                pagination={
                    userJointTrainigList.length > 12 && {
                        pageSize: 12,
                        size: 'small',
                    }
                }
            />
        </div>
    );
};
