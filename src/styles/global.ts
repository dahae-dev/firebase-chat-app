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
    @media screen and (min-width: 1080px) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 450px;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
