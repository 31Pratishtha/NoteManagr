import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewTaskMutation } from '../tasks/tasksApiSlice'
import { Save } from '@mui/icons-material'
import {
	Stack,
	Button,
	TextField,
	FormGroup,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material'

export default function NewTaskForm({ users }) {
	const navigate = useNavigate()

	const [addNewTask, { isSuccess, isError, error, isLoading }] =
		useAddNewTaskMutation()

	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [userId, setUserId] = useState(users[0].id)

	useEffect(() => {
		if (isSuccess) {
			setTitle('')
			setText('')
			setUserId('')
			navigate('/dash/tasks')
		}
		if (isError) {
			console.log('Errorrr: ', error)
		}
	}, [isSuccess, isError, navigate])

	const onTitleChanged = (e) => setTitle(e.target.value)
	const onTextChanged = (e) => setText(e.target.value)
	const onUserIdChanged = (e) => setUserId(e.target.value)

	const canSave = [title, text, userId].every(Boolean) && !isLoading

	const onSaveTaskClicked = async (e) => {
		e.preventDefault()
		if (canSave) {
			await addNewTask({ user: userId, title, text })
			console.log('doneee')
		}
	}

	const options = users.map((user) => {
		return (
			<MenuItem key={user.id} value={user.id}>
				{user.username}
			</MenuItem>
		)
	})

	const content = (
		<>
			<p>{error?.data?.message}</p>
			<form onSubmit={onSaveTaskClicked} noValidate autoComplete="off">
				<h2>New Task</h2>
				<Stack gap={2}>
					<TextField
						required="Title is required"
						label="Title"
						onChange={onTitleChanged}
					/>
					<TextField
						required
						label="Description"
						multiline
						rows={5}
						onChange={onTextChanged}
					/>
					<FormGroup>
						<InputLabel>Assigned To:</InputLabel>
						<Select required value={userId} onChange={onUserIdChanged}>
							{options}
						</Select>
					</FormGroup>
				</Stack>
				<Button
					sx={{ marginTop: '2rem', padding: '1rem 2rem' }}
					type="submit"
					label="submit"
					variant="contained"
					size="large">
					<Save />
				</Button>
			</form>
		</>
	)

	return content
}
