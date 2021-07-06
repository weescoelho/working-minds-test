import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { api } from 'api/api';
import { Loading } from 'helpers/Loading';
import { Header } from 'components/Header';
import { States } from 'utils/types';
import { Button } from '@material-ui/core';
import { StateCard } from '../../components/StateCard';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const StateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
  margin: 64px 0;
`;

export function Home(): JSX.Element {
  const [data, setData] = useState<States>();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const getData = async (): Promise<void> => {
      setLoading(true);
      const stateData = await api.get('/states');
      setData(stateData.data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleCreateState = (): void => {
    history.push('/cadastrar/estado');
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container>
        <StateGrid>
          {data &&
            data.map(state => (
              <StateCard key={state.id} id={state.id} stateName={state.name} />
            ))}
        </StateGrid>
        <Button variant="contained" color="primary" onClick={handleCreateState}>
          Adicionar estado
        </Button>
      </Container>
    </>
  );
}
