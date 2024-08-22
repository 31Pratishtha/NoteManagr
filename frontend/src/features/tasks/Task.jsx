import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectTaskById } from './tasksApiSlice'

export default function Task({ taskId }) {
	const task = useSelector((state) => selectTaskById(state, taskId))
	const navigate = useNavigate()

	if (task) {
		const created = new Date(task.createdAt).toLocaleString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})

		const updated = new Date(task.updatedAt).toLocaleString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})

		const handleEdit = () => navigate(`/dash/tasks/${taskId}`)

		return (
			<tr>
				<td>{task.completed ? <span>Completed</span> : <span>Open</span>}</td>
				<td>{created}</td>
				<td>{updated}</td>
				<td>{task.title}</td>
				<td>{task.username}</td>
				<td>
					<button onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			</tr>
		)
	} else return null
}
