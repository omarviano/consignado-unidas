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

  body.react-confirm-alert-body-element{
    overflow: hidden;
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

  .react-confirm-alert-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(21, 21, 31, 0.5);
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease-in-out 0s, visibility 0.3s ease-in-out 0s;
    z-index: 999;
    overflow: auto;
  }
`;

export { GlobalStyles };
