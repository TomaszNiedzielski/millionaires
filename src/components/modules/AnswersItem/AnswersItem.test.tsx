import '@testing-library/jest-native/extend-expect';
import { render, fireEvent } from '@testing-library/react-native';
import AnswersItem from './AnswersItem';

describe('AnswersItem', () => {
    test('selecting answer', () => {
        const mockCallBack = jest.fn();

        const { getByText } = render(<AnswersItem
            id="A"
            value="YES"
            onSelect={mockCallBack}
        />);

        fireEvent.press(getByText('YES'));

        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    test('selecting answer when mode is "selected"', () => {
        const mockCallBack = jest.fn();

        const { getByText } = render(<AnswersItem
            id="A"
            value="YES"
            onSelect={mockCallBack}
            mode="selected"
        />);

        fireEvent.press(getByText('YES'));

        expect(mockCallBack.mock.calls.length).toEqual(0);
    });

    test('selecting answer when mode is "correct"', () => {
        const mockCallBack = jest.fn();

        const { getByText } = render(<AnswersItem
            id="A"
            value="YES"
            onSelect={mockCallBack}
            mode="correct"
        />);

        fireEvent.press(getByText('YES'));

        expect(mockCallBack.mock.calls.length).toEqual(0);
    });

    test('selecting answer when mode is "incorrect"', () => {
        const mockCallBack = jest.fn();

        const { getByText } = render(<AnswersItem
            id="A"
            value="YES"
            onSelect={mockCallBack}
            mode="incorrect"
        />);

        fireEvent.press(getByText('YES'));

        expect(mockCallBack.mock.calls.length).toEqual(0);
    });

    test('selecting answer when mode is "disabled"', () => {
        const mockCallBack = jest.fn();

        const { getByText } = render(<AnswersItem
            id="A"
            value="YES"
            onSelect={mockCallBack}
            mode="disabled"
        />);

        fireEvent.press(getByText('YES'));

        expect(mockCallBack.mock.calls.length).toEqual(0);
    });
});
