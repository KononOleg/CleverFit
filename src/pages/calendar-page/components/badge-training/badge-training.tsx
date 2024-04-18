import { BadgeCustom } from '../badge-custom';

import styles from './badge-training.module.scss';

import { Training } from '@/types/index';

type Props = {
    training: Training[];
    isEdit?: boolean;
    onChange?: (name: string) => void;
};

export const BadgeTraining = ({ training, isEdit, onChange }: Props) => (
    <ul>
        {training.map(({ name, _id, isImplementation }, index) => (
            <li className={styles.badgeList} key={_id}>
                <BadgeCustom
                    text={name}
                    isEdit={isEdit}
                    index={index}
                    isImplementation={isImplementation}
                    onChange={() => onChange && onChange(name)}
                />
            </li>
        ))}
    </ul>
);
