import { EditOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { Badge, Button } from 'antd';
import cn from 'classnames';

import styles from './badge-custom.module.scss';

type Props = {
    text: string;
    isImplementation?: boolean;
    isEdit?: boolean;
    isExercise?: boolean;
    index?: number;
    onChange?: () => void;
};

const colors = new Map([
    ['Силовая', 'yellow'],
    ['Ноги', 'red'],
    ['Руки', 'cyan'],
    ['Грудь', 'green'],
    ['Спина', 'orange'],
]);

export const BadgeCustom = ({
    text,
    isEdit,
    isExercise,
    index,
    onChange,
    isImplementation,
}: Props) => (
    <div className={styles.BadgeCustomWrapper}>
        {isExercise ? (
            <p className={styles.ExerciseText}>{text}</p>
        ) : (
            <Badge
                className={cn({
                    [styles.BadgeCustomDisabled]: isImplementation,
                })}
                color={colors.get(text)}
                text={text}
            />
        )}

        {isEdit && (
            <Button
                data-test-id={`${DATA_TEST_ID.MODAL_UPDATE_TRAINING_EDIT_BUTTON}${index}`}
                type='link'
                className={styles.button}
                icon={<EditOutlined />}
                onClick={onChange}
                disabled={isImplementation}
            />
        )}
    </div>
);
