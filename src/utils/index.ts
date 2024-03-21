import { RuleRender } from 'antd/lib/form';
import { RcFile } from 'antd/lib/upload';
import { Action, Location } from 'history';
import moment, { Moment } from 'moment';

import { YYYY_MM_DD } from '@constants/index';
import { Nullable, Training } from '../types';

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

export const getTrainingByDay = (value: Nullable<string>, training: Training[]) =>
    training.filter(
        ({ date }) => moment(date).format(YYYY_MM_DD) === moment(value).format(YYYY_MM_DD),
    );

export const getSelectedCell = (date: Moment) =>
    document.querySelectorAll<HTMLElement>(`[title*="${moment(date).format(YYYY_MM_DD)}"]`)[0];

export const getOffsetTop = (date: Moment) => Number(getSelectedCell(date).offsetTop) + 32;

export const isOldDate = (date: string) => Boolean(date && moment(date).isBefore(moment()));

export const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
