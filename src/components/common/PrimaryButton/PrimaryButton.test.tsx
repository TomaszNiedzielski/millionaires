import '@testing-library/jest-native/extend-expect';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
    test('button handles click event', () => {
        const mockCallBack = jest.fn();

        const { getByText } = render((<PrimaryButton
            title="Press"
            onPress={mockCallBack}
        />));
        
        fireEvent.press(getByText('Press'));

        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    test('button is disabled', () => {
        const { getByText } = render(<PrimaryButton
            title="Press"
            disabled
        />);

        fireEvent.press(getByText('Press'));
        
        expect(getByText('Press')).toBeDisabled();
    });

    test('button can be styled', () => {
        const { getByTestId } = render(<PrimaryButton
            title="Press"
            onPress={() => {}}
            style={{ backgroundColor: 'green' }}
        />);

        expect(getByTestId('PrimaryButton')).toHaveStyle({ backgroundColor: 'green' })
    });
});
