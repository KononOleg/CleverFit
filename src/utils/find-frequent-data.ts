import { ActivityList } from '../types';

export const findFrequentData = (activityList: ActivityList) => {
    const exerciseMap: { [exerciseName: string]: number } = {};
    const trainingMap: { [trainingName: string]: number } = {};

    let mostFrequentExercise = '';
    let mostFrequentTraining = '';
    let maxExerciseCount = 0;
    let maxTrainingCount = 0;

    activityList.forEach((training) => {
        training.exercises.forEach((exercise) => {
            const exerciseName = exercise.name;

            if (exerciseName) {
                if (exerciseMap[exerciseName]) exerciseMap[exerciseName] += 1;
                else exerciseMap[exerciseName] = 1;

                if (exerciseMap[exerciseName] > maxExerciseCount) {
                    mostFrequentExercise = exerciseName;
                    maxExerciseCount = exerciseMap[exerciseName];
                }
            }
        });

        training.names.forEach((name) => {
            const trainingName = name;

            if (trainingName) {
                if (trainingMap[trainingName]) trainingMap[trainingName] += 1;
                else trainingMap[trainingName] = 1;

                if (trainingMap[trainingName] > maxTrainingCount) {
                    mostFrequentTraining = trainingName;
                    maxTrainingCount = trainingMap[trainingName];
                }
            }
        });
    });

    return { mostFrequentTraining, mostFrequentExercise };
};
