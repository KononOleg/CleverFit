import { Training } from '../../../../types';
import { BadgeCustom } from '../badge-custom';

type Props = {
    training: Training[];
    isEdit?: boolean;
};

export const BadgeTraining = ({ training, isEdit }: Props) => {
    return (
        <ul>
            {training.map(({ name, id }) => (
                <li key={id} style={{ lineHeight: 1.2 }}>
                    <BadgeCustom text={name} isEdit={isEdit} />
                </li>
            ))}
        </ul>
    );
};
