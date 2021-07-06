import { Button, TextField } from '@material-ui/core';
import { api } from 'api/api';
import { CityCard } from 'components/CityCard';
import { Header } from 'components/Header';
import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import { City, State } from 'utils/types';

type StatePageParams = {
  id: string;
};

const Container = styled.section`
  max-width: 900px;
  margin: 0 auto;
  h2 {
    margin: 32px 0 8px 0;
  }
  > button {
    margin-top: 32px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    margin-left: 8px;
  }
`;

const CreateNewCityArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  form {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    button {
      margin-top: 16px;
    }
  }
  h3 {
    font-size: 18px;
  }
`;

export function StatePage(): JSX.Element {
  const [dataCities, setDataCities] = useState<Array<City>>();
  const [dataState, setDataState] = useState<State>();
  const params = useParams<StatePageParams>();
  const history = useHistory();
  const { addToast } = useToasts();

  const [newCity, setNewCity] = useState('');

  const getDataOnUpdate = async (): Promise<void> => {
    const cities = await api.get(`/cities?stateId=${params.id}`);
    const states = await api.get(`/states/${params.id}`);
    setDataCities(cities.data);
    setDataState(states.data);
  };

  function handleStateSubmit(event: FormEvent): void {
    event.preventDefault();
    const createNewCity = async (): Promise<any> => {
      try {
        await api.post('/cities', {
          name: newCity,
          stateId: params.id,
        });
        addToast('Estado cadastrado com sucesso', {
          appearance: 'success',
          autoDismiss: true,
        });
        getDataOnUpdate();
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
      const cities = await api.get(`/cities?stateId=${params.id}`);
      const states = await api.get(`/states/${params.id}`);
      setDataCities(cities.data);
      setDataState(states.data);
    };
    getData();
  }, [params.id]);

  const handleDeleteState = (): void => {
    const deleteState = async (): Promise<void> => {
      await api.delete(`/states/${params.id}`);
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
            <CityCard cityName={city.name} cityId={city.id} />
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
