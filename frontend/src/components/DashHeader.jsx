import React, { useEffect, useState } from 'react'
import {
	Typography,
	Toolbar,
	AppBar,
	Drawer,
	List,
	ListItem,
	Box,
	Button,
	Link,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
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
import Welcome from '../features/auth/Welcome'

const DASH_REGEX = /^\/dash(\/)?$/
const TASKS_REGEX = /^\/dash\/tasks(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

export default function DashHeader() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { isAdmin, isManager } = useAuth()

	const [open, setOpen] = useState(false)

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
		<button onClick={handleLogoutClicked}>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</button>
	)

	let usersButton = null
	if (isManager || isAdmin) {
		if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
			usersButton = (
				<button onClick={onUsersClicked}>
					<FontAwesomeIcon icon={faUserGear} />
				</button>
			)
		}
	}

	let tasksButton = null
	if (!TASKS_REGEX.test(pathname) && pathname.includes('/dash')) {
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

	const toggleDrawer = (newOpen) => {
		setOpen(newOpen)
	}

	const content = (
		<>
			<AppBar position="static">
				<header>
					<Toolbar>
						<Button onClick={() => toggleDrawer(true)}>
							<MenuIcon sx={{ color: 'primary.light' }} />
						</Button>
						<Typography align="center">
							<Link
								component={RouterLink}
								to="/dash"
								color="inherit"
								underline="none">
								Project
							</Link>
						</Typography>
						<nav>{buttonContent}</nav>
					</Toolbar>
					<Drawer
						variant="temporary"
						open={open}
						onClose={() => toggleDrawer(false)}>
						<Box onClick={() => toggleDrawer(false)}>
							<Welcome />
						</Box>
					</Drawer>
				</header>
				<Typography>{error?.data?.message}</Typography>
			</AppBar>
		</>
	)

	return content
}
