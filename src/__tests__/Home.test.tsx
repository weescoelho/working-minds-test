import { create } from 'react-test-renderer';
import { Home } from '../pages/Home';

test('render Home page', () => {
  const c = create(<Home />);
  expect(c.toJSON()).toMatchSnapshot();
});
