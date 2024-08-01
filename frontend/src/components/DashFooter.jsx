import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function DashFooter() {
	const navigate = useNavigate()
	const { pathname } = useLocation()

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
		<footer>
			{goHomeButton}
			<p>Current User: {username}</p>
			<p>Status: {status}</p>
		</footer>
	)
	return content
}
