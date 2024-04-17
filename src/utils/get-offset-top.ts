import { Moment } from 'moment';

import { getSelectedCell } from './get-celected-cell';

export const getOffsetTop = (date: Moment) => Number(getSelectedCell(date).offsetTop) + 32;
