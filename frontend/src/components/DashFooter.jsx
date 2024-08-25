import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useTheme, BottomNavigation, Typography, Box } from '@mui/material'

export default function DashFooter() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const theme = useTheme()

	const { username, status } = useAuth()

	const onGoHomeClicked = () => navigate('/dash')
	let goHomeButton = null
	if (pathname !== '/dash') {
		goHomeButton = (
			<button onClick={onGoHomeClicked}>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		)
	}
	const content = (
		<Box component='footer' sx={{ bottom: 0, width: '100%', display: 'flex', flexDirection: 'column', padding: '1rem 2rem'}}>
			{goHomeButton}
			<Typography >Current User: {username}</Typography>
			<Typography>Status: {status}</Typography>
		</Box>
	)
	return content
}
