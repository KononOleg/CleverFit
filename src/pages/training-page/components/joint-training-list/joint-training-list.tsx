import { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { sortTrainingList } from '@utils/filter-training-list';
import { Button, Input, List } from 'antd';

import { JointTrainingCard } from '../joint-training-card';

import styles from './joint-training-list.module.scss';

import { JointTrainig } from '@/types/index';

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
        <div className={styles.jointTrainingList}>
            <div className={styles.searhing} data-test-id={DATA_TEST_ID.SEARCH_INPUT}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type='text'
                    className={styles.backButton}
                    onClick={goBackHandler}
                >
                    Назад
                </Button>
                <Input.Search
                    placeholder='Поиск по имени'
                    className={styles.searhInput}
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
                className={styles.jointList}
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
