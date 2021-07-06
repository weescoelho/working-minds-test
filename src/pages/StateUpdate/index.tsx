import { Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
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
};

export function StateUpdate(): JSX.Element {
  const { updateState, getData } = useContext(DataContext);
  const [newStateName, setNewStateName] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams<StatePageParams>();
  const history = useHistory();

  const handleStateSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    await updateState(newStateName, params.id);
    await getData();
    setLoading(false);
    history.push(`/estado/${params.id}`);
    setNewStateName('');
  };

  const handleReturnPage = (): void => {
    history.push(`/estado/${params.id}`);
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container>
        <h2>Editar estado: {params.name}</h2>
        <form onSubmit={handleStateSubmit}>
          <TextField
            id="outlined-helperText"
            label="Novo nome"
            helperText="Digite o nome do estado"
            variant="outlined"
            onChange={({ target }) => setNewStateName(target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Alterar nome
          </Button>
        </form>
        <Button variant="contained" color="primary" onClick={handleReturnPage}>
          Voltar
        </Button>
      </Container>
    </>
  );
}
