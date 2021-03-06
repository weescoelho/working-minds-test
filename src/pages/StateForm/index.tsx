import { Button, TextField } from '@material-ui/core';
import { Header } from 'components/Header';
import { DataContext } from 'contexts/DataContext';
import { Loading } from 'helpers/Loading';
import { useContext } from 'react';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

export function StateForm(): JSX.Element {
  const { createNewState } = useContext(DataContext);
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleStateSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    await createNewState(state);
    setLoading(false);
    history.push('/');
    setState('');
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container>
        <h2>Cadastrar Estado</h2>
        <form onSubmit={handleStateSubmit}>
          <TextField
            id="outlined-helperText"
            label="Nome da cidade"
            helperText="Digite o nome da cidade"
            variant="outlined"
            onChange={({ target }) => setState(target.value)}
          />
          <Button variant="contained" type="submit" color="primary">
            Cadastrar
          </Button>
        </form>
      </Container>
    </>
  );
}
