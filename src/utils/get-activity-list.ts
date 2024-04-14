import moment from 'moment';

import { Training, TrainingType } from '../types';

export const getActivityList = (
    training: Training[],
    period: string,
    selectedTraining: TrainingType,
) => {
    const currentDate = moment();

    const days: string[] = [];

    if (period === 'week') {
        const weekStart = currentDate.startOf('week');

        Array(7)
            .fill(0)
            .forEach((_, i) => days.push(moment(weekStart).add(i, 'days').format()));
    }

    if (period === 'month') {
        const monthStart = currentDate.clone().startOf('month').startOf('week');

        Array(28)
            .fill(0)
            .forEach((_, i) => days.push(moment(monthStart).add(i, 'days').format()));
    }
    const filteredTraining =
        selectedTraining.key === 'all'
            ? training
            : training.filter(({ name }) => name === selectedTraining.name);

    return days.map((day) => {
        const trainingFind = filteredTraining.find(({ date }) => moment(date).isSame(day, 'day'));

        let activity = 0;
        let replays = 0;
        let approaches = 0;

        trainingFind?.exercises.forEach((exercises) => {
            activity += exercises.weight * exercises.replays * exercises.approaches;
            replays += exercises.replays;
            approaches += exercises.approaches;
        });

        return {
            date: day,
            activity,
            replays,
            approaches,
            name: trainingFind?.name || '',
            exercises: trainingFind?.exercises || [],
        };
    });
};
