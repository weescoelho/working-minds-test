import { Button } from '@material-ui/core';
import { api } from 'api/api';
import { DataContext } from 'contexts/DataContext';
import { useContext } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { City } from 'utils/types';
import { Loading } from '../helpers/Loading';

const CardContainer = styled.div`
  margin: 8px 0;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  button {
    margin-left: 8px;
  }
  opacity: 0;
  transform: translateX(-30px);
  animation: anim 0.3s ease forwards;
  @keyframes anim {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

type StateCardProps = {
  stateId: string;
  cityId: string;
  cityName: string;
  setDataCities: Dispatch<SetStateAction<City[] | undefined>>;
};

export function CityCard({
  cityId,
  cityName,
  setDataCities,
  stateId,
}: StateCardProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const { deleteCityById } = useContext(DataContext);
  const history = useHistory();

  const getDataOnUpdate = async (): Promise<void> => {
    setLoading(true);
    const cities = await api.get(`/cities?stateId=${stateId}`);
    setDataCities(cities.data);
    setLoading(false);
  };

  const handleDeleteCity = async (): Promise<void> => {
    setLoading(true);
    await deleteCityById(cityId);
    getDataOnUpdate();
    setLoading(false);
  };

  const handleUpdateCityName = (): void => {
    history.push(`/cidade/editar/${stateId}/${cityId}/${cityName}`);
  };

  return (
    <CardContainer>
      {loading && <Loading />}
      <p>{cityName}</p>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateCityName}
        >
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
