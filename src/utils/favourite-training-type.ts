import { Training, TrainingList } from '../types';

export const getFavouriteTraining = (training: Training[], trainingList: TrainingList) => {
    const result: Record<string, number> = {};

    training.forEach(({ exercises, name }) => {
        exercises.forEach(({ replays, weight, approaches }) => {
            result[name] = replays * weight * approaches;
        });
    });

    const [maxName] = Object.entries(result).sort(([, a], [, b]) => b - a)[0];
    const maxTraining = trainingList.find(({ name }) => name === maxName);

    return maxTraining?.key;
};
