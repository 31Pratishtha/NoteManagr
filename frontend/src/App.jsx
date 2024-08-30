import { Outlet } from 'react-router-dom'
import {
	CssBaseline,
	ThemeProvider,
	createTheme,
} from '@mui/material'
import useTitle from './hooks/useTitle'
import { light } from '@mui/material/styles/createPalette'


// --black: #020202ff;
// --indigo-dye: #03478Cff;
// --vivid-sky-blue: #5ec3e8ff;
// --white: #fefcfdff;
// --mauveine: #9e17a1ff;

const theme = createTheme({
	palette: {
		primary: {
			main: '#03478Cff',
			light: '#F9F9F9ff',
			contrastText: '#F9F9F9ff'
		},
		secondary: {
			main: '#79dafd',
			light: '#F9F9F9ff',
			contrastText: '#020202ff'
		},
		accent: {
			main: '#2A7221',
			light: '#b7e3b56f'
		},
		text: {
			default: '#020202ff',
		},
	},
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif'
	}
})

function App() {
	useTitle('WindzTasksMgr')
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Outlet />
			</ThemeProvider>
		</>
	)
}

export default App