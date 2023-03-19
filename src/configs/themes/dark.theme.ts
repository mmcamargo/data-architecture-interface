import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: indigo[500],
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 475,
			md: 815,
			lg: 1024,
			xl: 1440,
		},
	},
});
