import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  height: 100vh;
  width: 100vw;
  img {
    width: 150px;
  }
`;

export function Loading(): JSX.Element {
  return (
    <Wrapper>
      <img
        src="https://i.pinimg.com/originals/5f/e0/e5/5fe0e55f8e19bc4cc3201876dce7b224.gif"
        alt=""
      />
    </Wrapper>
  );
}
