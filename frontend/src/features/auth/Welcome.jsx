import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Box, Typography, Link } from '@mui/material'

export default function Welcome() {
	const { username, isManager, isAdmin } = useAuth()
	const content = (
		<Box>
			<Typography variant='h4'>Welcome ! {username}</Typography>
			<Typography>
				<Link component={RouterLink} to={'/dash/tasks'}>View Tasks</Link>
			</Typography>
			<Typography>
				<Link component={RouterLink} to={'/dash/tasks/new'}>Add new task</Link>
			</Typography>

			{(isManager || isAdmin) && (
				<Typography>
					<Link component={RouterLink} to={'/dash/users'}>View Users</Link>
				</Typography>
			)}
			{(isManager || isAdmin) && (
				<Typography>
					<Link component={RouterLink} to={'/dash/users/new'}>Add new user</Link>
				</Typography>
			)}
		</Box>
	)
	return content
}
