import { darkTheme } from '@/configs';
import { AppRoutes } from '@/routes';
import { ThemeProvider, CssBaseline } from '@mui/material';

export function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<AppRoutes />
		</ThemeProvider>
	);
}
