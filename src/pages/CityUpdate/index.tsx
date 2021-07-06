import { Button, TextField } from '@material-ui/core';
import { Header } from 'components/Header';
import { DataContext } from 'contexts/DataContext';
import { Loading } from 'helpers/Loading';
import { useContext } from 'react';
import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
  form {
    display: flex;
    flex-direction: column;
  }
  h2 {
    margin: 64px 0px 16px 0;
  }
  button {
    margin-top: 32px;
  }
`;

type StatePageParams = {
  id: string;
  name: string;
  stateId: string;
};

export function CityUpdate(): JSX.Element {
  const { updateCity, getData } = useContext(DataContext);
  const [newCityName, setNewCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams<StatePageParams>();
  const history = useHistory();

  const handleStateSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    await updateCity(newCityName, params.id, params.stateId);
    await getData();
    setLoading(false);
    history.push(`/estado/${params.stateId}`);
    setNewCityName('');
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container>
        <h2>Editar cidade: {params.name}</h2>
        <form onSubmit={handleStateSubmit}>
          <TextField
            id="outlined-helperText"
            label="Novo nome"
            helperText="Digite o nome da cidade"
            variant="outlined"
            onChange={({ target }) => setNewCityName(target.value)}
          />
          <Button variant="contained" type="submit" color="primary">
            Alterar nome
          </Button>
        </form>
      </Container>
    </>
  );
}
