import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
:root{
  font-size:62.5%;
}
@media (max-width:739px){
  :root{
  font-size:52.5%;
}
}
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body{
    background:${({ theme }) => theme.colors.background};
    font-size: 14px;
    color:${({ theme }) => theme.colors.text};
  }
  body, input,button,textarea{
    font: 400 16px 'Roboto', sans-serif;
  }
`;
