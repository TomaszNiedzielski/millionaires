import { render } from '@testing-library/react-native';
import Background from './Background';

it('renders background image', () => {
    const { getByRole } = render(<Background />);

    expect(getByRole('image')).toBeDefined();
});
