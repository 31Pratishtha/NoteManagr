import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Typography, Card, Grid, CardContent, styled } from '@mui/material'
import {
	AutoAwesomeMotion,
	NoteAdd,
	PersonAdd,
	Groups,
} from '@mui/icons-material'

export default function Welcome() {
	const { username, isManager, isAdmin } = useAuth()

	const StyledLinkCard = styled(Link)(({ theme }) => ({
		textDecoration: 'none',
		color: 'inherit',
		'& .MuiCard-root': {
			width: '8rem',
			height: '9rem',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.palette.accent.light,
		},
	}))

	const content = (
		<>
			<Typography variant="h4" align="center" paddingTop={4}>
				Welcome! {username}
			</Typography>
			<Grid
				container
				justifyContent="center"
				columnSpacing={6}
				rowSpacing={5}
				padding={8}>
					
				<Grid item>
					<StyledLinkCard to={'/dash/tasks'}>
						<Card raised>
							<CardContent align="center">
								<AutoAwesomeMotion color="accent" fontSize="large" />
								<br />
								View Tasks
							</CardContent>
						</Card>
					</StyledLinkCard>
				</Grid>

				<Grid item>
					<StyledLinkCard to={'/dash/tasks/new'}>
						<Card raised>
							<CardContent align="center">
								<NoteAdd color="accent" fontSize="large" /> <br />
								Add new task
							</CardContent>
						</Card>
					</StyledLinkCard>
				</Grid>

				{(isManager || isAdmin) && (
					<Grid item>
						<StyledLinkCard to={'/dash/users'}>
							<Card raised>
								<CardContent align="center">
									<Groups color="accent" fontSize="large" /> <br />
									View Users
								</CardContent>
							</Card>
						</StyledLinkCard>
					</Grid>
				)}

				{(isManager || isAdmin) && (
					<Grid item>
						<StyledLinkCard to={'/dash/users/new'}>
							<Card raised>
								<CardContent align="center">
									<PersonAdd color="accent" fontSize='large'/> <br />
									Add new user
								</CardContent>
							</Card>
						</StyledLinkCard>
					</Grid>
				)}
			</Grid>
		</>
	)
	return content
}
