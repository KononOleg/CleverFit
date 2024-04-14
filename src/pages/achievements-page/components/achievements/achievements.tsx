import { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { getActivityList } from '@utils/get-activity-list';

import { ActivityList } from '../../../../types';
import { ActivityBlock } from '../activity-block';
import { FilterPanel } from '../filter-panel';

type Props = {
    period: string;
};

export const Achievements = ({ period }: Props) => {
    const { training, trainingList } = useAppSelector(trainingSelector);
    const [activityList, setActivityList] = useState<ActivityList>([]);
    const trainingData = [{ name: 'Все', key: 'all' }, ...trainingList];
    const [selectedTraining, setSelectedTraining] = useState(trainingData[0]);

    useEffect(() => {
        setActivityList(getActivityList(training, period, selectedTraining));
    }, [period, selectedTraining, training]);

    return (
        <Fragment>
            <FilterPanel
                trainingData={trainingData}
                selectedTraining={selectedTraining}
                setSelectedTraining={setSelectedTraining}
            />
            <ActivityBlock activityList={activityList} />
        </Fragment>
    );
};
