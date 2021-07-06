import { create } from 'react-test-renderer';
import { Logo } from '../components/Logo';

test('render Logo component', () => {
  const c = create(<Logo />);
  expect(c.toJSON()).toMatchSnapshot();
});
