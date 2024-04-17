const colors = new Map([
    ['Силовая', 'yellow'],
    ['Ноги', 'red'],
    ['Руки', 'cyan'],
    ['Грудь', 'green'],
    ['Спина', 'orange'],
]);

export const getBadgeColor = (training: string) => colors.get(training);
