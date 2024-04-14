import { ActivityList } from '../types';

export const calculateActivityDate = (activityList: ActivityList) => {
    let totalLoad = 0;
    let totalReplays = 0;
    let totalApproaches = 0;
    let countActivityDays = 0;

    activityList.forEach(({ activity, replays, approaches }) => {
        totalLoad += activity;
        totalReplays += replays;
        totalApproaches += approaches;
        if (activity) countActivityDays += 1;
    });

    return {
        totalLoad,
        loadPerDay: Math.round((totalLoad / countActivityDays) * 10) / 10,
        totalReplays,
        totalApproaches,
    };
};
