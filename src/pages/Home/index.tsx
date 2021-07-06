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
  opacity: 0;
  transform: translateX(-30px);
  animation: anim 0.3s ease forwards;
  @keyframes anim {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @media (max-width: 739px) {
    max-width: 300px;
  }
  @media (min-width: 739px) and (max-width: 979px) {
    max-width: 640px;
  }
`;

const StateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
  margin: 64px 0;
  @media (max-width: 739px) {
    grid-template-columns: 1fr;
    column-gap: 0px;
  }
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
