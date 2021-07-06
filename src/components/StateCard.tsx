import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { City } from 'utils/types';

const CardContainer = styled.div`
  background-color: #fff;
  max-width: 300px;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }
`;

type StateCardProps = {
  id: string;
  stateName: string;
  cities: Array<City>;
};

export function StateCard({
  id,
  stateName = 'São Paulo',
  cities,
}: StateCardProps): JSX.Element {
  return (
    <CardContainer>
      <Link to={`/estado/${id}`}>
        <h3>{stateName}</h3>
        <p>Cidades cadastradas: {cities.length}</p>
      </Link>
    </CardContainer>
  );
}
