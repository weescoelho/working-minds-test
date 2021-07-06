import { create } from 'react-test-renderer';
import { CityCard } from '../components/CityCard';

test('render CityCard component', () => {
  const setDataCities = jest.fn();
  const c = create(
    <CityCard
      cityId="1"
      cityName="test"
      stateId="1"
      setDataCities={setDataCities}
    />,
  );
  expect(c.toJSON()).toMatchSnapshot();
});
