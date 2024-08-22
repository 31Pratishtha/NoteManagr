import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTaskById } from './tasksApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditTaskForm from './EditTaskForm'

export default function EditTask() {
	const { id } = useParams()

	const task = useSelector((state) => selectTaskById(state, id))
	const users = useSelector(selectAllUsers)
	console.log("user in edit task", users)

	const content =
		task && users ? (
			<EditTaskForm users={users} task={task} />
		) : (
			<p>Loading...</p>
		)

	return content
}
