import moment from 'moment';

import { Exercise, Training, TrainingType } from '../types';

export const getActivityList = (
    training: Training[],
    period: string,
    selectedTraining: TrainingType,
) => {
    const currentDate = moment();

    const days: string[] = [];

    if (period === 'week') {
        const weekStart = currentDate.clone().subtract(6, 'days').startOf('day');

        Array(7)
            .fill(0)
            .forEach((_, i) => days.push(moment(weekStart).add(i, 'days').format()));
    }

    if (period === 'month') {
        const monthStart = currentDate.clone().subtract(27, 'days').startOf('week');

        Array(28)
            .fill(0)
            .forEach((_, i) => days.push(moment(monthStart).add(i, 'days').format()));
    }

    const filteredByDaysTraining = training.filter(({ date }) =>
        days.includes(moment(date).startOf('day').format()),
    );

    const filteredTraining =
        selectedTraining.key === 'all'
            ? filteredByDaysTraining
            : filteredByDaysTraining.filter(({ name }) => name === selectedTraining.name);

    if (filteredTraining.length === 0) return [];

    return days.map((day) => {
        const trainingFind = filteredTraining.filter(({ date }) => moment(date).isSame(day, 'day'));

        let activity = 0;
        let replays = 0;
        let approaches = 0;
        const trainingExercises: Exercise[] = [];
        const trainingNames: string[] = [];

        trainingFind.forEach(({ exercises, name }) => {
            trainingNames.push(name);
            exercises.forEach((exercise) => {
                activity += exercise.weight * exercise.replays * exercise.approaches;
                replays += exercise.replays;
                approaches += exercise.approaches;
                trainingExercises.push(exercise);
            });
        });

        return {
            date: day,
            activity,
            replays,
            approaches,
            activityPerDay: activity / trainingExercises.length,
            name: '',
            exercises: trainingExercises,
            names: trainingNames,
        };
    });
};
