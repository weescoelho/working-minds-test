import { create } from 'react-test-renderer';
import { StateForm } from '../pages/StateForm';

test('render StateForm page', () => {
  const c = create(<StateForm />);
  expect(c.toJSON()).toMatchSnapshot();
});
