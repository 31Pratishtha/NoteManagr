import React, { useEffect, useState } from 'react'
import { useUpdateTaskMutation, useDeleteTaskMutation } from './tasksApiSlice'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {
	Box,
	Button,
	Stack,
	TextField,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	FormControlLabel,
	Checkbox,
} from '@mui/material'
import { Save, Delete } from '@mui/icons-material'

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
	console.log('completed: ', completed)
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
		// setCompleted((prev) => !prev)
		setCompleted(e.target.checked)
	}
	const onUserIdChanged = (e) => {
		setUserId(e.target.value)
	}

	const options = users.map((user) => {
		return (
			<MenuItem value={user.id} key={user.id}>
				{user.username}
			</MenuItem>
		)
	})

	const errorContent = (error?.data?.message || delError?.data?.message) ?? ''

	let deleteTaskButton = null
	if (isManager || isAdmin) {
		deleteTaskButton = (
			<Button size="large" variant="contained" onClick={onDeleteTaskClicked}>
				<Delete />
			</Button>
		)
	}
	const content = (
		<>
			<p>{error?.data?.message}</p>
			<form action="" onSubmit={(e) => e.preventDefault()}>
				<h2>Edit Task</h2>
				<Stack gap={2}>
					<Box display="flex" gap={5}>
						<Button
							size="large"
							variant="contained"
							onClick={onUpdateTaskClicked}>
							<Save />
						</Button>
						{deleteTaskButton}
					</Box>
					<Box display="flex" gap={7}>
						<Typography>
							Created At: <br /> {created}
						</Typography>
						<Typography>
							Updated At: <br /> {updated}
						</Typography>
					</Box>

					<TextField
						label="Title"
						onChange={onTitleChanged}
						value={title}
					/>

					<TextField
						required
						label="Description"
						multiline
						rows={3}
						value={text}
						onChange={onTextChanged}
					/>

					<FormControlLabel
						control={
							<Checkbox
								sx={{ width: '3.5rem' }}
								label="Completed"
								checked={completed}
								size="large"
								onChange={onStatusChanged}
							/>
						}
						label="Completed"
					/>

					<FormGroup>
						<InputLabel>Assigned To:</InputLabel>
						<Select required value={userId} onChange={onUserIdChanged}>
							{options}
						</Select>
					</FormGroup>

				</Stack>
			</form>
		</>
	)

	return content
}
