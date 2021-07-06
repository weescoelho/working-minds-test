import styled from 'styled-components';

export const Container = styled.section`
  max-width: 900px;
  margin: 0 auto;
  h2 {
    margin: 32px 0 8px 0;
  }
  > button {
    margin-top: 32px;
  }
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

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    margin-left: 8px;
  }
  @media (max-width: 739px) {
    flex-direction: column;
    text-align: center;
    div + div {
      margin-top: 16px;
    }
  }
`;

export const CreateNewCityArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  form {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    button {
      margin-top: 16px;
    }
  }
  h3 {
    font-size: 18px;
  }
`;
