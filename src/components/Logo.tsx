import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoContainer = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: '#F4F4F4';
  text-decoration: none;
`;

export function Logo(): JSX.Element {
  return <LogoContainer>CRUD</LogoContainer>;
}
