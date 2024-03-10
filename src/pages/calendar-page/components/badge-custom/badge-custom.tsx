import { Badge, Button } from 'antd';

import styles from './badge-custom.module.scss';
import { EditOutlined } from '@ant-design/icons';

type Props = {
    text: string;
    isEdit?: boolean;
    isExercise?: boolean;
};

const colors = new Map([
    ['Cиловая', 'yellow'],
    ['Ноги', 'red'],
    ['Руки', 'cyan'],
    ['Грудь', 'green'],
    ['Спина', 'orange'],
]);

export const BadgeCustom = ({ text, isEdit, isExercise }: Props) => (
    <div className={styles.BadgeCustomWrapper}>
        {isExercise ? (
            <p className={styles.ExerciseText}>{text}</p>
        ) : (
            <Badge className={styles.BadgeCustom} color={colors.get(text)} text={text} />
        )}

        {isEdit && <Button type='link' className={styles.button} icon={<EditOutlined />} />}
    </div>
);
