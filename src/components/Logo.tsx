import styled from 'styled-components';

const LogoContainer = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
`;

export function Logo(): JSX.Element {
  return <LogoContainer>CRUD</LogoContainer>;
}
