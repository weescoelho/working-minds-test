import { Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { api } from 'api/api';
import { CityCard } from 'components/CityCard';
import { Header } from 'components/Header';
import { DataContext } from 'contexts/DataContext';
import { Loading } from 'helpers/Loading';
import { useContext } from 'react';
import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { City, State } from 'utils/types';
import {
  Container,
  CreateNewCityArea,
  SectionHeader,
} from './StatePage.styled';

type StatePageParams = {
  id: string;
};

export function StatePage(): JSX.Element {
  const { deleteStateById, createNewCity } = useContext(DataContext);
  const [dataCities, setDataCities] = useState<Array<City>>();
  const [dataState, setDataState] = useState<State>();
  const [loading, setLoading] = useState(false);
  const params = useParams<StatePageParams>();
  const history = useHistory();
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setLoading(true);
      const cities = await api.get(`/cities?stateId=${params.id}`);
      const states = await api.get(`/states/${params.id}`);
      setDataCities(cities.data);
      setDataState(states.data);
      setLoading(false);
    };
    getData();
  }, [params.id]);

  const getDataOnUpdate = async (): Promise<void> => {
    setLoading(true);
    const cities = await api.get(`/cities?stateId=${params.id}`);
    const states = await api.get(`/states/${params.id}`);
    setDataCities(cities.data);
    setDataState(states.data);
    setLoading(false);
  };

  const handleNewCitySubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    await createNewCity(newCity, params.id);
    getDataOnUpdate();
    setLoading(false);
    setNewCity('');
  };

  const handleUpdateStateName = (): void => {
    history.push(`/estado/editar/${params.id}/${dataState?.name}`);
  };

  const handleDeleteState = async (): Promise<void> => {
    await deleteStateById(params.id);
    history.push('/');
  };

  const handleReturnPage = (): void => {
    history.push('/');
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container>
        <SectionHeader>
          <div>
            <h2>{dataState?.name}</h2>
            <p>Cidades cadastradas: {dataCities?.length}</p>
          </div>
          <div>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              onClick={handleUpdateStateName}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              type="submit"
              color="secondary"
              onClick={handleDeleteState}
              startIcon={<DeleteIcon />}
            >
              Excluir estado
            </Button>
          </div>
        </SectionHeader>
        {dataCities &&
          dataCities.map(city => (
            <CityCard
              key={city.id}
              stateId={params.id}
              cityName={city.name}
              cityId={city.id}
              setDataCities={setDataCities}
            />
          ))}
        <CreateNewCityArea>
          <h3>Cadastrar nova cidade</h3>
          <form onSubmit={handleNewCitySubmit}>
            <TextField
              id="outlined-helperText"
              label="Nome da cidade"
              helperText="Digite o nome da cidade"
              variant="outlined"
              onChange={({ target }) => setNewCity(target.value)}
              defaultValue={newCity}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Cadastrar
            </Button>
          </form>
        </CreateNewCityArea>
        <Button variant="contained" color="primary" onClick={handleReturnPage}>
          Voltar
        </Button>
      </Container>
    </>
  );
}
