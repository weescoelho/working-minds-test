import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body{
    background: #F8F8F8;
    font-size: 14px;
    color: #333;
  }
  body, input,button,textarea{
    font: 400 16px 'Roboto', sans-serif;
  }
`;
