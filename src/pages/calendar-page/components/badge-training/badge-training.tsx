import { Training } from '../../../../types';
import { BadgeCustom } from '../badge-custom';

type Props = {
    training: Training[];
    isEdit?: boolean;
    onChange?: (name: string) => void;
};

export const BadgeTraining = ({ training, isEdit, onChange }: Props) => (
    <ul>
        {training.map(({ name, _id }, index) => (
            <li key={_id} style={{ lineHeight: 1.2 }}>
                <BadgeCustom
                    text={name}
                    isEdit={isEdit}
                    index={index}
                    onChange={() => onChange && onChange(name)}
                />
            </li>
        ))}
    </ul>
);
