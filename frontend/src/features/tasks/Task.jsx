import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import {Edit} from '@mui/icons-material'

import {Button, TableCell, TableRow} from '@mui/material'

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

		console.log('task: ', task)
		return (
			<TableRow>
				<TableCell>{task.completed ? <span>Completed</span> : <span>Open</span>}</TableCell>
				<TableCell>{created}</TableCell>
				<TableCell>{updated}</TableCell>
				<TableCell>{task.title}</TableCell>
				<TableCell>{task.username}</TableCell>
				<TableCell>
					<Button onClick={handleEdit} variant='outlined'>
						<Edit />
					</Button>
				</TableCell>
			</TableRow>
		)
	} else return null
}
