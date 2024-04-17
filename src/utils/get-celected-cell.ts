import { YYYY_MM_DD } from '@constants/date-format';
import moment, { Moment } from 'moment';

export const getSelectedCell = (date: Moment) =>
    document.querySelectorAll<HTMLElement>(`[title*="${moment(date).format(YYYY_MM_DD)}"]`)[0];
