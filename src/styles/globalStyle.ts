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

    /* body {
        min-width: 300px;
    } */

    #root {
        min-height: 100vh;

        padding: 8rem 0;

        @media (max-width: 1024px) {
            padding: 0;
        }
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

    button, a {
        cursor: pointer;    
    }

    :focus {
        border: 3px solid ${(props) => props.theme['green-500']};
    }

    @media (max-width: 710px) {
        html {
            font-size: 42.5%;
        }
    }

    @media (max-width: 530px) {
        html {
            font-size: 38.5%;
        }
    }
`;
