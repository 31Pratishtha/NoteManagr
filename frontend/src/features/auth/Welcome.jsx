import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Welcome() {
	const { username, isManager, isAdmin } = useAuth()
	const content = (
		<section>
			<p></p>
			<h1>Welcome ! {username}</h1>
			<p>
				<Link to={'/dash/notes'}>View Notes</Link>
			</p>
			<p>
				<Link to={'/dash/notes/new'}>Add new note</Link>
			</p>

			{(isManager || isAdmin) && (
				<p>
					<Link to={'/dash/users'}>View Users</Link>
				</p>
			)}
			{(isManager || isAdmin) && (
				<p>
					<Link to={'/dash/users/new'}>Add new user</Link>
				</p>
			)}
		</section>
	)
	return content
}
