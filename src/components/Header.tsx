import styled from 'styled-components';
import { Logo } from './Logo';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 50px;
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary};
    margin-right: 8px;
  }
`;

export function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <Logo />
    </HeaderContainer>
  );
}
