import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyle } from "./styles/globalStyle.ts";
import { ThemeProvider } from "styled-components";
import { defaultThemes } from "./styles/themes/default.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={defaultThemes}>
			<App />
			<GlobalStyle />
		</ThemeProvider>
	</React.StrictMode>,
);
