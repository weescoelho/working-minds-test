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
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    margin-left: 8px;
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
