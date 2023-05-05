import { ThemeProvider } from "styled-components"; 

import { Button } from "./components/Button";
import { defaultThemes } from "./styles/themes/default";

function App() {
	return (
		<ThemeProvider theme={defaultThemes}>
			<Button variantprop="a" />
			<Button variantprop="s" />
			<Button variantprop="d" />
			<Button variantprop="f" />
			<Button />
		</ThemeProvider>
	);
}

export default App;
