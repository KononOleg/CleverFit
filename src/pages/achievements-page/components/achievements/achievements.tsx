import { Fragment, useLayoutEffect, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { getActivityList } from '@utils/get-activity-list';

import { ActivityBlock } from '../activity-block';
import { CardBlock } from '../card-block';
import { FilterPanel } from '../filter-panel';
import { FrequentExersiceBlock } from '../frequent-exersice-block';
import { FrequentTrainingBlock } from '../frequent-training-block';
import { NotFoundActivity } from '../not-found-activity';

import { ActivityList } from '@/types/index';

type Props = {
    period: string;
};

export const Achievements = ({ period }: Props) => {
    const { training, trainingList } = useAppSelector(trainingSelector);
    const [activityList, setActivityList] = useState<ActivityList>([]);
    const trainingData = [{ name: 'Все', key: 'all' }, ...trainingList];
    const [selectedTraining, setSelectedTraining] = useState(trainingData[0]);

    const isEmptyActivityList = activityList.length === 0;

    useLayoutEffect(() => {
        setActivityList(getActivityList(training, period, selectedTraining));
    }, [period, selectedTraining, training]);

    return (
        <Fragment>
            <FilterPanel
                trainingData={trainingData}
                selectedTraining={selectedTraining}
                setSelectedTraining={setSelectedTraining}
            />
            {isEmptyActivityList ? (
                <NotFoundActivity
                    title={
                        period === 'month'
                            ? 'Ой, такой тренировки в этом месяце не было.'
                            : 'Ой, такой тренировки на этой неделе не было.'
                    }
                />
            ) : (
                <Fragment>
                    <ActivityBlock activityList={activityList} />
                    <CardBlock activityList={activityList} />
                    <FrequentTrainingBlock
                        activityList={activityList}
                        selectedTraining={selectedTraining}
                    />
                    <FrequentExersiceBlock activityList={activityList} />
                </Fragment>
            )}
        </Fragment>
    );
};
