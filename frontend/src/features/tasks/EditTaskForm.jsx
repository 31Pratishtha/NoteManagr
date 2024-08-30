import React, { useEffect, useState } from 'react'
import { useUpdateTaskMutation, useDeleteTaskMutation } from './tasksApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'

export default function EditTaskForm({ task, users }) {
	const navigate = useNavigate()
	const { isManager, isAdmin } = useAuth()
	const [updateTask, { isLoading, isError, error, isSuccess }] =
		useUpdateTaskMutation()

	const [
		deleteTask,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delError },
	] = useDeleteTaskMutation()

	const [title, setTitle] = useState(task.title)
	const [text, setText] = useState(task.text)
	const [completed, setCompleted] = useState(task.completed)
	const [userId, setUserId] = useState(task.user)

	const created = new Date(task.createdAt).toLocaleString('en-us', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})
	const updated = new Date(task.updatedAt).toLocaleString('en-us', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setTitle('')
			setText('')
			setUserId('')
			navigate('/dash/tasks')
		}
	}, [isSuccess, isDelSuccess, navigate])

	const onUpdateTaskClicked = async (e) => {
		e.preventDefault()
		await updateTask({
			id: task.id,
			user: userId,
			title,
			text,
			completed,
		})
	}
	const onDeleteTaskClicked = async (e) => {
		e.preventDefault()
		await deleteTask({ id: task.id })
	}

	const onTitleChanged = (e) => {
		setTitle(e.target.value)
	}
	const onTextChanged = (e) => {
		setText(e.target.value)
	}
	const onStatusChanged = (e) => {
		setCompleted((prev) => !prev)
	}
	const onUserIdChanged = (e) => {
		setUserId(e.target.value)
	}

	const options = users.map((user) => {
		return (
			<option value={user.id} key={user.id}>
				{user.username}
			</option>
		)
	})

	const errorContent = (error?.data?.message || delError?.data?.message) ?? ''

	let deleteTaskButton = null
	if (isManager || isAdmin) {
		deleteTaskButton = (
			<button onClick={onDeleteTaskClicked}>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		)
	}
	const content = (
		<>
			<p>{errorContent}</p>
			<form action="" onSubmit={(e) => e.preventDefault()}>
				<div>
					<h2>Edit Task</h2>
					<div>
						<button onClick={onUpdateTaskClicked}>
							<FontAwesomeIcon icon={faSave} />
						</button>
						{deleteTaskButton}
					</div>
				</div>

				<label htmlFor="title">Title:</label>
				<input type="text" id="title" value={title} onChange={onTitleChanged} />

				<label htmlFor="text">Description:</label>
				<textarea id="text" value={text} onChange={onTextChanged}></textarea>

				<label htmlFor="status">Status:</label>
				<input type="checkbox" checked={completed} onChange={onStatusChanged} />

				<label htmlFor="user">Assigned To:</label>
				<select id="userId" value={userId} onChange={onUserIdChanged}>
					{options}
				</select>

				<div>
					<p>
						Created At: <br /> {created}
					</p>
					<p>
						Updated At: <br /> {updated}
					</p>
				</div>
			</form>
		</>
	)

	return content
}
