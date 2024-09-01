import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from '../users/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles.js'
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

const USER_REGEX = /^[A-Za-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%&*]{4,12}$/

export default function NewUserForm() {
	const navigate = useNavigate()

	const [addNewUser, { isSuccess, isError, error, isLoading }] =
		useAddNewUserMutation()

	const [username, setUsername] = useState('')
	const [validUsername, setValidUsername] = useState(false)
	const [password, setPassword] = useState('')
	const [validpassword, setValidPassword] = useState(false)
	const [roles, setRoles] = useState(['Employee'])

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password))
	}, [password])

	useEffect(() => {
		if (isSuccess) {
			setUsername('')
			setPassword('')
			setRoles([])
			navigate('/dash/users')
		}
	}, [isSuccess, navigate])

	const onUserNameChanged = (e) => setUsername(e.target.value)
	const onPasswordChanged = (e) => setPassword(e.target.value)

	const onRolesChanged = (e) => {
		setRoles(e.target.value)
	}

	const options = Object.values(ROLES).map((role) => {
		return (
			<MenuItem key={role} value={role}>
				{role}
			</MenuItem>
		)
	})

	const canSave =
		[validUsername, validpassword, roles.length].every(Boolean) && !isLoading

	const onSaveUserClicked = async (e) => {
		e.preventDefault()
		if (canSave) {
			await addNewUser({ username, password, roles })
		}
	}

	const content = (
		<>
			<p>{error?.data?.message}</p>

			<form onSubmit={onSaveUserClicked} noValidate autoComplete="off">
				<h2>New User</h2>
				<Stack gap={2}>
					<TextField
						required
						label="Username"
						value={username}
						error={!validUsername && username !== ''}
						helperText={
							!validUsername && username !== '' ? 'Invalid Username' : ''
						}
						onChange={onUserNameChanged}
					/>
					<TextField
						required
						type="password"
						label="Password"
						value={password}
						onChange={onPasswordChanged}
						error={!validpassword && password !== ''}
						helperText={
							!validpassword && password !== '' ? 'Invalid Password' : ''
						}
					/>
					<FormGroup>
						<InputLabel>Assigned To:</InputLabel>
						<Select
							required
							value={roles}
							multiple
							size="3"
							renderValue={(selected) => selected.join(', ')}
							onChange={onRolesChanged}>
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
