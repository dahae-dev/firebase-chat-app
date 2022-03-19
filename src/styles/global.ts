import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  
  html,
  body,
  #root {
    background-color: white;
    font-family: 'Apple SD Gothic', sans-serif;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
