import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoContainer = styled.div`
  a {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
  }
`;

export function Logo(): JSX.Element {
  return (
    <LogoContainer>
      <Link to="/">CRUD</Link>
    </LogoContainer>
  );
}
