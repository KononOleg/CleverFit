import moment from 'moment';

export const isOldDate = (date: string) => Boolean(date && moment(date).isBefore(moment()));
