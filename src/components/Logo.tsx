import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const LogoContainer = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: '#F4F4F4';
  text-decoration: none;
  cursor: pointer;
`;

export function Logo(): JSX.Element {
  const history = useHistory();
  const handleClickLogo = (): void => {
    history.push('/');
  };
  return <LogoContainer onClick={handleClickLogo}>CRUD</LogoContainer>;
}
