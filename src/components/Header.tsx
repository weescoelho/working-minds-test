import styled from 'styled-components';
import { Logo } from './Logo';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #51bbfe;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  color: #f4f4f4;
`;

export function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <Logo />
    </HeaderContainer>
  );
}
