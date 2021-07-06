import { api } from 'api/api';
import { useEffect, useState } from 'react';
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
};

export function StateCard({
  id,
  stateName = 'São Paulo',
}: StateCardProps): JSX.Element {
  const [cities, setCities] = useState<Array<City>>();
  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await api.get(`/cities?stateId=${id}`);
      setCities(response.data);
    };
    getData();
  }, [id]);

  return (
    <CardContainer>
      <Link to={`/estado/${id}`}>
        <h3>{stateName}</h3>
        <p>Cidades cadastradas:{cities?.length}</p>
      </Link>
    </CardContainer>
  );
}
