import { Button } from '@material-ui/core';
import { api } from 'api/api';
import styled from 'styled-components';

const CardContainer = styled.div`
  margin: 8px 0;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }
  button {
    margin-left: 8px;
  }
`;

type StateCardProps = {
  cityId: string;
  cityName: string;
};

export function CityCard({
  cityId,
  cityName = 'São Paulo',
}: StateCardProps): JSX.Element {
  const handleDeleteCity = (): void => {
    api.delete(`/cities/${cityId}`);
  };

  return (
    <CardContainer>
      <p>{cityName}</p>
      <div>
        <Button variant="contained" color="primary">
          Editar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteCity}
        >
          Excluir
        </Button>
      </div>
    </CardContainer>
  );
}
