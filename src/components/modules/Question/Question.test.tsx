import '@testing-library/jest-native/extend-expect';
import { render } from '@testing-library/react-native';
import Question from './Question';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

describe('Question', () => {
    it('renders question', async () => {
        const component = (
            <Provider store={store}>
                <Question />
            </Provider>
        );

        const { getByRole } = render(component);

        expect(getByRole('text')).toBeTruthy();
    });
});
