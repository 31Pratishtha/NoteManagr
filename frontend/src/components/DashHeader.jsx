import React, { useEffect, useState } from 'react'
import { Typography, Toolbar, AppBar, Button, Link, Box } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faRightFromBracket,
	faUserGear,
	faUserPlus,
	faFilePen,
	faFileCirclePlus,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const TASKS_REGEX = /^\/dash\/tasks(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

export default function DashHeader() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { isAdmin, isManager } = useAuth()

	const [sendLogout, { isLoading, isError, error, isSuccess }] =
		useSendLogoutMutation()

	useEffect(() => {
		if (isSuccess) {
			navigate('/')
		}
	}, [isSuccess, navigate])

	const handleLogoutClicked = async () => {
		await sendLogout()
		navigate('/')
	}
	const onUsersClicked = () => navigate('/dash/users')
	const onTasksClicked = () => navigate('/dash/tasks')
	const onNewUserClicked = () => navigate('/dash/users/new')
	const onNewTaskClicked = () => navigate('/dash/tasks/new')

	if (isLoading) return <p>Logging out...</p>

	if (isError) return <p>Error: {error.data.message}</p>

	const logoutButton = (
		<Button
			variant="contained"
			color="secondary"
			size="small"
			sx={{ display: 'flex', gap: '10px' }}
			onClick={handleLogoutClicked}>
			<Logout />
			Logout
		</Button>
	)

	let usersButton = null
	if (isManager || isAdmin) {
		if (!USERS_REGEX.test(pathname) && TASKS_REGEX.test(pathname)) {
			usersButton = (
				<button onClick={onUsersClicked}>
					<FontAwesomeIcon icon={faUserGear} />
				</button>
			)
		}
	}

	let tasksButton = null
	if (!TASKS_REGEX.test(pathname) && USERS_REGEX.test(pathname)) {
		tasksButton = (
			<button onClick={onTasksClicked}>
				<FontAwesomeIcon icon={faFilePen} />
			</button>
		)
	}

	let newUserButton = null
	if (USERS_REGEX.test(pathname)) {
		newUserButton = (
			<button onClick={onNewUserClicked}>
				<FontAwesomeIcon icon={faUserPlus} />
			</button>
		)
	}

	let newTaskButton = null
	if (TASKS_REGEX.test(pathname)) {
		newTaskButton = (
			<button onClick={onNewTaskClicked}>
				<FontAwesomeIcon icon={faFileCirclePlus} />
			</button>
		)
	}

	let buttonContent = null

	if (isLoading) {
		buttonContent = <p>Loading...</p>
	} else {
		buttonContent = (
			<>
				{newTaskButton}
				{newUserButton}
				{tasksButton}
				{usersButton}
				{logoutButton}
			</>
		)
	}

	const content = (
		<>
			<AppBar component="header" position="static">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography align="center">
						<Link
							component={RouterLink}
							to="/dash"
							color="inherit"
							underline="none">
							Sample Project
						</Link>
					</Typography>
					<nav>{buttonContent}</nav>
				</Toolbar>
				<Typography>{error?.data?.message}</Typography>
			</AppBar>
		</>
	)

	return content
}
