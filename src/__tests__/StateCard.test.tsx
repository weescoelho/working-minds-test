import { create } from 'react-test-renderer';
import { StateCard } from '../components/StateCard';

test('render StateCard component', () => {
  const c = create(<StateCard id="1" stateName="Default" />);
  expect(c.toJSON()).toMatchSnapshot();
});
