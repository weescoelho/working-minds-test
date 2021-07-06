import { Button, TextField } from '@material-ui/core';
import { api } from 'api/api';
import { CityCard } from 'components/CityCard';
import { Header } from 'components/Header';
import { Loading } from 'helpers/Loading';
import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
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
  const [dataCities, setDataCities] = useState<Array<City>>();
  const [dataState, setDataState] = useState<State>();
  const [loading, setLoading] = useState(false);
  const params = useParams<StatePageParams>();
  const history = useHistory();
  const { addToast } = useToasts();
  const [newCity, setNewCity] = useState('');

  const getDataOnUpdate = async (): Promise<void> => {
    setLoading(true);
    const cities = await api.get(`/cities?stateId=${params.id}`);
    const states = await api.get(`/states/${params.id}`);
    setDataCities(cities.data);
    setDataState(states.data);
    setLoading(false);
  };

  function handleStateSubmit(event: FormEvent): void {
    event.preventDefault();
    const createNewCity = async (): Promise<any> => {
      try {
        setLoading(true);
        await api.post('/cities', {
          name: newCity,
          stateId: params.id,
        });
        addToast('Estado cadastrado com sucesso', {
          appearance: 'success',
          autoDismiss: true,
        });
        getDataOnUpdate();
        setLoading(false);
      } catch {
        addToast('Não foi possivel cadastrar!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    createNewCity();
    setNewCity('');
  }

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

  const handleDeleteState = (): void => {
    const deleteState = async (): Promise<void> => {
      setLoading(true);
      await api.delete(`/states/${params.id}`);
      setLoading(false);
    };
    deleteState();
    addToast('Estado excluido com sucesso!', {
      appearance: 'success',
      autoDismiss: true,
    });
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
            <Button variant="contained" type="submit" color="primary">
              Editar
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              onClick={handleDeleteState}
            >
              Excluir estado
            </Button>
          </div>
        </SectionHeader>
        {dataCities &&
          dataCities.map(city => (
            <CityCard
              stateId={params.id}
              cityName={city.name}
              cityId={city.id}
              setDataCities={setDataCities}
            />
          ))}
        <CreateNewCityArea>
          <h3>Cadastrar nova cidade</h3>
          <form onSubmit={handleStateSubmit}>
            <TextField
              id="outlined-helperText"
              label="Nome da cidade"
              helperText="Digite o nome da cidade"
              variant="outlined"
              onChange={({ target }) => setNewCity(target.value)}
              defaultValue={newCity}
            />
            <Button variant="contained" type="submit" color="primary">
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
