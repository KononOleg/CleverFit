import moment from 'moment';

import { ActivityList } from '@/types/index';

export const sortWeekday = (activityList: ActivityList) =>
    [...activityList].sort((a, b) => moment(a.date).weekday() - moment(b.date).weekday());
