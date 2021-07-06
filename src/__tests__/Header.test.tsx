import { create } from 'react-test-renderer';
import { Header } from '../components/Header';

test('render Header component', () => {
  const c = create(<Header />);
  expect(c.toJSON()).toMatchSnapshot();
});
