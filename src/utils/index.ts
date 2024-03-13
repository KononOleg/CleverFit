import { Training } from '../types';
import { RuleRender } from 'antd/lib/form';
import { Action, Location } from 'history';
import moment, { Moment } from 'moment';

export const confirmPasswordRule: (name: string) => RuleRender =
    (name) =>
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue(name) === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Пароли не совпадают'));
        },
    });

export const checkPrevPath = (
    prevLocation:
        | {
              location?: Location | null | undefined;
              action?: Action | null | undefined;
          }[]
        | undefined,
    path: string,
) => prevLocation?.length && prevLocation[1]?.location?.pathname === path;

export const getTrainingByDay = (value: string | null, training: Training[]) =>
    training.filter(
        ({ date }) => moment(date).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'),
    );

export const getSelectedCell = (date: Moment) =>
    document.querySelectorAll<HTMLElement>(`[title*="${moment(date).format('YYYY-MM-DD')}"]`)[0];

export const getOffsetTop = (date: Moment) => Number(getSelectedCell(date).offsetTop) + 32;

export const isOldDate = (date: string) => Boolean(date && moment(date).isBefore(moment()));
