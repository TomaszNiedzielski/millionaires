import { render } from '@testing-library/react-native';
import AppName from './AppName';

it('renders background image', () => {
    const { getAllByText } = render(<AppName />);

    expect(getAllByText('Fame')).toBeDefined();
});
