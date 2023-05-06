import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    #root {
        min-height: 100vh;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1.6rem;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;

        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme.white};
    }

    :focus {
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
    }
`;
