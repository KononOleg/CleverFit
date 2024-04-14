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

    return days.map((day) => {
        const filteredTraining =
            selectedTraining.key === 'all'
                ? training
                : training.filter(({ name }) => name === selectedTraining.name);
        const trainingFind = filteredTraining.find((y) => moment(y.date).isSame(day, 'day'));
        const activity =
            trainingFind?.exercises.reduce(
                (n, { weight, replays, approaches }) => n + weight * replays * approaches,
                0,
            ) || 0;

        return {
            date: day,
            activity,
        };
    });
};
