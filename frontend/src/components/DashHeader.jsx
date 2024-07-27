import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

export default function DashHeader() {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const [sendLogout, { isLoading, isError, error, isSuccess }] =
		useSendLogoutMutation()

	const handleLogoutClicked = () => sendLogout()

	useEffect(() => {
		if (isSuccess) {
			navigate('/')
		}
	}, [isSuccess, navigate])

	if (isLoading) return <p>Logging out...</p>

	if (isError) return <p>Error: {error.data.message}</p>

	const logoutButton = (
		<button onClick={handleLogoutClicked}>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</button>
	)

	const content = (
		<header className="dash-header">
			<div className="dash-header__container">
				<Link to="/dash">
					<h1 className="dash-header__title">techNotes</h1>
				</Link>
				{logoutButton}
				<nav className="dash-header__nav">{/* add nav buttons later */}</nav>
			</div>
		</header>
	)

	return content
}
