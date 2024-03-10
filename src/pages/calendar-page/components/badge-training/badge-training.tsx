import { DATA_TEST_ID } from '@constants/index';
import { Training } from '../../../../types';
import { BadgeCustom } from '../badge-custom';

type Props = {
    training: Training[];
    isEdit?: boolean;
};

export const BadgeTraining = ({ training, isEdit }: Props) => {
    return (
        <ul>
            {training.map(({ name, id }, index) => (
                <li
                    key={id}
                    style={{ lineHeight: 1.2 }}
                    data-test-id={`${DATA_TEST_ID.MODAL_UPDATE_TRAINING_EDIT_BUTTON}${index}`}
                >
                    <BadgeCustom text={name} isEdit={isEdit} />
                </li>
            ))}
        </ul>
    );
};
