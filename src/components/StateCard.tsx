import { api } from 'api/api';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    color: #333;
  }
`;

type StateCardProps = {
  id: string;
  stateName: string;
};

export function StateCard({ id, stateName }: StateCardProps): JSX.Element {
  const [cities, setCities] = useState<Array<City>>();
  const history = useHistory();
  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await api.get(`/cities?stateId=${id}`);
      setCities(response.data);
    };
    getData();
  }, [id]);

  const handleClick = (): void => {
    history.push(`/estado/${id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <h3>{stateName}</h3>
      <p>Cidades cadastradas:{cities?.length}</p>
    </CardContainer>
  );
}
