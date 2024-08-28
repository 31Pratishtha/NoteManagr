import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {
	useTheme,
	BottomNavigation,
	Typography,
	Box,
	Container,
	Button,
} from '@mui/material'

import { Home } from '@mui/icons-material'

export default function DashFooter() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const theme = useTheme()

	const { username, status } = useAuth()

	const onGoHomeClicked = () => navigate('/dash')
	let goHomeButton = null
	if (pathname !== '/dash') {
		goHomeButton = (
			<Button variant="contained" color="primary" onClick={onGoHomeClicked}>
				<Home />
			</Button>
		)
	}
	const content = (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				position: 'relative',
				bottom: '1rem',
				paddingX: '3rem',
			}}>
			<Box>
				<Typography>Current User: {username}</Typography>
				<Typography>Status: {status}</Typography>
			</Box>
			{goHomeButton}
		</Box>
	)
	return content
}
