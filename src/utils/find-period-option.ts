import { PeriodOptions } from '../types';

export const periodOptions: PeriodOptions[] = [
    { name: 'Через 1 день', period: 1 },
    { name: 'Через 2 дня', period: 2 },
    { name: 'Через 3 дня', period: 3 },
    { name: 'Через 4 дня', period: 4 },
    { name: 'Через 5 дней', period: 5 },
    { name: 'Через 6 дней', period: 6 },
    { name: '1 раз в неделю', period: 7 },
];

export const getPeriodByItem = (name: string) => {
    const fidnOption = periodOptions.find((option) => option.name === name);

    return fidnOption ? fidnOption.period : null;
};

export const getKeyByPeriod = (period: number | undefined) => {
    const fidnOption = periodOptions.find((option) => option.period === period);

    return fidnOption ? fidnOption.name : '';
};
