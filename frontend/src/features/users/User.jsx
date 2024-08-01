import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'

import { useGetUsersQuery } from './usersApiSlice'

function User({ userId }) {
	const navigate = useNavigate()

	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[userId],
		}),
	})

	const handleEdit = () => {
		navigate(`/dash/users/${userId}`)
	}
	const userRolesString = user.roles.toString().replaceAll(',', ', ')

	if (user) {
		return (
			<tr>
				<td>{user.username}</td>
				<td>{userRolesString}</td>
				<td>
					<button onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			</tr>
		)
	} else return null
}

const memoizedUser = memo(User)

export default memoizedUser
