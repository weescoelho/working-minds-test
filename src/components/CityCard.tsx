import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { api } from 'api/api';
import { DataContext } from 'contexts/DataContext';
import { useContext } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import { City } from 'utils/types';

const CardContainer = styled.div`
  margin: 8px 0;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
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
  const { deleteCityById } = useContext(DataContext);
  const history = useHistory();

  const getDataOnUpdate = async (): Promise<void> => {
    const cities = await api.get(`/cities?stateId=${stateId}`);
    setDataCities(cities.data);
  };

  const handleDeleteCity = async (): Promise<void> => {
    await deleteCityById(cityId);
    getDataOnUpdate();
  };

  const handleUpdateCityName = (): void => {
    history.push(`/cidade/editar/${stateId}/${cityId}/${cityName}`);
  };

  return (
    <>
      <CardContainer>
        <p>{cityName}</p>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleUpdateCityName}
          >
            Editar
          </Button>
          <IconButton aria-label="delete" onClick={handleDeleteCity}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContainer>
    </>
  );
}
