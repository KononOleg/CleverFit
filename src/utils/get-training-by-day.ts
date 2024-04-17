import { YYYY_MM_DD } from '@constants/date-format';
import { Nullable, Training } from '@types/index';
import moment from 'moment';

export const getTrainingByDay = (value: Nullable<string>, training: Training[]) =>
    training.filter(
        ({ date }) => moment(date).format(YYYY_MM_DD) === moment(value).format(YYYY_MM_DD),
    );
