import { Button, TextField } from '@material-ui/core';
import { api } from 'api/api';
import { Header } from 'components/Header';
import { Loading } from 'helpers/Loading';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
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
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();

  function handleStateSubmit(event: FormEvent): void {
    event.preventDefault();
    const createState = async (): Promise<any> => {
      try {
        await api.post('/states', {
          name: state,
        });
        addToast('Estado cadastrado com sucesso', {
          appearance: 'success',
          autoDismiss: true,
        });
        history.push('/');
      } catch {
        addToast('Não foi possivel cadastrar!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    createState();
    setState('');
  }

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
