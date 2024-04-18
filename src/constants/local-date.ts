import ruRu from 'antd/es/calendar/locale/ru_RU';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';

export const LOCAL_DATE: PickerLocale = {
    ...ruRu,
    lang: {
        ...ruRu.lang,
        ...{
            shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            shortMonths: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июн',
                'Июл',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек',
            ],
        },
    },
};
