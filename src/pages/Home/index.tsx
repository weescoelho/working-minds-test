import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Loading } from 'helpers/Loading';
import { DataContext } from 'contexts/DataContext';
import { useHistory } from 'react-router-dom';
import { Header } from 'components/Header';
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
  const { states, loading } = useContext(DataContext);
  const history = useHistory();
  const handleCreateState = (): void => {
    history.push('/cadastrar/estado');
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container>
        <StateGrid>
          {states &&
            states.map(state => (
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
