import { StarTwoTone } from '@ant-design/icons';

export const characterRender = (index: number | undefined, value: number) => {
    if (index || index === 0) {
        return index < value ? (
            <StarTwoTone twoToneColor={['#FAAD14', '#FAAD14']} />
        ) : (
            <StarTwoTone twoToneColor={['#FAAD14', 'transparent']} />
        );
    }
};
