import moment from 'moment';

import { ActivityList, Exercise } from '../types';

export const getFrequentExercises = (activityList: ActivityList) => {
    const frequentExercises: ActivityList = [];

    for (let i = 0; i < 7; i++) {
        const exercisesByDay: Exercise[] = [];

        activityList
            .filter(({ date }) => moment(date).isoWeekday() === i + 1)
            .forEach(({ exercises }) => exercisesByDay.push(...exercises));

        const exerciseMap: { [exerciseName: string]: number } = {};
        let mostFrequentExerciseName = '';
        let maxExerciseCount = 0;

        exercisesByDay.forEach((exercise) => {
            const exerciseName = exercise.name;

            if (exerciseName) {
                if (exerciseMap[exerciseName]) exerciseMap[exerciseName] += 1;
                else exerciseMap[exerciseName] = 1;

                if (exerciseMap[exerciseName] > maxExerciseCount) {
                    mostFrequentExerciseName = exerciseName;
                    maxExerciseCount = exerciseMap[exerciseName];
                }
            }
        });

        frequentExercises.push({
            date: moment().weekday(i).toISOString(),
            activity: maxExerciseCount,
            name: mostFrequentExerciseName,
            replays: 0,
            approaches: 0,
            exercises: [],
            activityPerDay: 0,
            names: [],
        });
    }

    const frequentUniqueExercises: ActivityList = [];

    frequentExercises.forEach((exercise) => {
        const findIndex = frequentUniqueExercises.findIndex(({ name }) => name === exercise.name);

        if (findIndex === -1) frequentUniqueExercises.push(exercise);
        else frequentUniqueExercises[findIndex].activity += exercise.activity;
    });

    return { frequentExercises, frequentUniqueExercises };
};
