import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: #F9F9F9;

    #app {
      width: 100vw;
      height: 100vh;
    }
  }

  button, a {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

 ul {
    list-style: none;
  }

 li {
    cursor: pointer;
  }
`;

export { GlobalStyles };
