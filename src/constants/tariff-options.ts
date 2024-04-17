import { DATA_TEST_ID } from './data-test-id';

export const TARIFF_OPTIONS = [
    {
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        name: 'readyForJointTraining',
        dataTestId: DATA_TEST_ID.TARIFF_TRAININGS,
        dataTestIdIcon: DATA_TEST_ID.TARIFF_TRAININGS_ICON,
    },
    {
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        name: 'sendNotification',
        dataTestId: DATA_TEST_ID.TARIFF_NOTIFICATIONS,
        dataTestIdIcon: DATA_TEST_ID.TARIFF_NOTIFICATIONS_ICON,
    },
    {
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        dataTestId: DATA_TEST_ID.TARIFF_THEME,
        dataTestIdIcon: DATA_TEST_ID.TARIFF_THEME_ICON,
        forPro: true,
    },
];
