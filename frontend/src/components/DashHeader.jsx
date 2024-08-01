import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faRightFromBracket,
	faUserGear,
	faUserPlus,
	faFilePen,
	faFileCirclePlus,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
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
	const onNotesClicked = () => navigate('/dash/notes')
	const onNewUserClicked = () => navigate('/dash/users/new')
	const onNewNoteClicked = () => navigate('/dash/notes/new')

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

	let notesButton = null
	if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
		notesButton = (
			<button onClick={onNotesClicked}>
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

	let newNoteButton = null
	if (NOTES_REGEX.test(pathname)) {
		newNoteButton = (
			<button onClick={onNewNoteClicked}>
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
				{newNoteButton}
				{newUserButton}
				{notesButton}
				{usersButton}
				{logoutButton}
			</>
		)
	}

	const content = (
		<>
			<p>{error?.data?.message}</p>
			<header>
				<div>
					<Link to="/dash">
						<h1>techNotes</h1>
					</Link>
					<nav>{buttonContent}</nav>
				</div>
			</header>
		</>
	)

	return content
}
