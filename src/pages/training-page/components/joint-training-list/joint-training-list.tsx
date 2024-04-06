import { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { sortTrainingList } from '@utils/filter-training-list';
import { Button, Input, List } from 'antd';

import { JointTrainig } from '../../../../types';
import { JointTrainingCard } from '../joint-training-card';

import styles from './joint-training-list.module.scss';

type Props = {
    goBackHandler: () => void;
    onChangeTrainingHandler: (partner: JointTrainig) => void;
};

export const JointTrainingList = ({ goBackHandler, onChangeTrainingHandler }: Props) => {
    const { jointTrainigList } = useAppSelector(inviteSelector);
    const [searchValue, setSearchValue] = useState('');

    const filteredTrainingList = sortTrainingList(jointTrainigList, searchValue);

    const searchHandler = (value: string) => setSearchValue(value);

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
                <Input.Search
                    placeholder='Поиск по имени'
                    className={styles.SearhInput}
                    onSearch={searchHandler}
                />
            </div>
            <List
                dataSource={filteredTrainingList}
                renderItem={(partner, index) => (
                    <JointTrainingCard
                        partner={partner}
                        index={index}
                        onChangeTrainingHandler={onChangeTrainingHandler}
                        searchValue={searchValue}
                    />
                )}
                className={styles.JointList}
                pagination={
                    filteredTrainingList.length > 12 && {
                        pageSize: 12,
                        size: 'small',
                    }
                }
            />
        </div>
    );
};
