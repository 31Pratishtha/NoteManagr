import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	Container,
	Box,
	useTheme,
	Grid,
	Typography,
	Stack,
	Button,
} from '@mui/material'

export default function Public() {
	const theme = useTheme()
	const navigate = useNavigate()
	const rightContent = (
		<Grid
			sx={{ flexGrow: 1 }}
			item
			container
			md={6}
			xs={12}
			justifyContent="center"
			alignItems="center"></Grid>
	)
	const content = (
		<Box>
			<Container component="section" className="public">
				{/* <header>
				<h1>
					Welcome to <span className="nowrap">WindzTasksManager</span>
				</h1>
			</header>
			<main className="public__main">
				<h2>Streamline Your Workflow</h2>
				<p>
					Effortlessly manage your tasks, track progress, and collaborate in
					real-time with WindzTasksManager. Designed for teams and individuals
					who value efficiency, our tool brings simplicity to task management.
					Dive in and take control of your productivity today!"
					</p>
				<br />
			</main>
			<footer>
			<Link to="/login">Employee Login</Link>
			</footer> */}
				<Box
					sx={{
						minHeight: '100vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Stack gap={8} alignItems="center">
						<Typography
							variant="h1"
							fontSize={60}
							align="center"
							fontWeight={700}
							letterSpacing='0.1rem'>
							
							Welcome to <br />{' '}
							<span style={{color: theme.palette.primary.main}}>WindzTasksManager</span>
						</Typography>
						<Typography
							align="center"
							subtitle1
							fontWeight={400}
							// fontSize="1rem"
							lineHeight={1.75}
							fontSize={20}
							letterSpacing="0.07em">
							Effortlessly manage your tasks, track progress, and collaborate{' '}
							<br /> Designed for teams and individuals who value efficiency.{' '}
							<br /> Dive in and take control of your productivity today!"
						</Typography>
						<Button
							variant="contained"
							color="secondary"
							size="large"
							sx={{ display: 'flex', gap: '10px', width: '10rem' }}
							onClick={() => navigate('/login')}>
							Login
						</Button>
					</Stack>
				</Box>
			</Container>
		</Box>
	)
	return content
}
