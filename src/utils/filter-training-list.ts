import { INVITE_STATUS } from '@constants/invite-status';

import { JointTrainig } from '../types';

export const sortTrainingList = (traininglist: JointTrainig[], searchValue: string) => {
    if (!traininglist.length) return [];

    const acceptedTrainings: JointTrainig[] = [];
    const rejectedTrainings: JointTrainig[] = [];
    const pendingTrainings: JointTrainig[] = [];
    const trainings: JointTrainig[] = [];

    [...traininglist]
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((training) => {
            if (training.status === INVITE_STATUS.PENDING) pendingTrainings.push(training);
            if (training.status === INVITE_STATUS.ACCEPTED) acceptedTrainings.push(training);
            if (training.status === INVITE_STATUS.REJECTED) rejectedTrainings.push(training);
            if (!training.status) trainings.push(training);
        });

    const filter = [
        ...acceptedTrainings,
        ...pendingTrainings,
        ...trainings,
        ...rejectedTrainings,
    ].filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()));

    return filter;
};
