import { useState, useEffect } from 'react'
import {
	useUpdateUserMutation,
	useDeleteUserMutation,
} from '../users/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles.js'
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

const USER_REGEX = /^[A-Za-z]{3,20}$/
const PWD_REGEX = /^[A-Z0-9!@#$%&*]{4,12}$/

export default function EditUserForm({ user }) {
	const navigate = useNavigate()

	const [updateUser, { isLoading, isSuccess, isError, error }] =
		useUpdateUserMutation()

	const [
		deleteUser,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteUserMutation()

	const [username, setUsername] = useState(user.username)
	const [validUsername, setValidUsername] = useState(false)
	const [password, setPassword] = useState('')
	const [validpassword, setValidPassword] = useState(false)
	const [roles, setRoles] = useState(user.roles)
	const [active, setActive] = useState(user.active)

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password))
	}, [password])

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setUsername('')
			setPassword('')
			setRoles([])
			navigate('/dash/users')
		}
	}, [isSuccess, isDelSuccess, navigate])

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

	const onActiveChanged = () => setActive((prev) => !prev)

	let canSave
	if (password)
		canSave =
			[roles.length, validUsername, validpassword].every(Boolean) && !isLoading
	else canSave = [roles.length, validUsername].every(Boolean) && !isLoading

	const onUpdateUserClicked = async (e) => {
		e.preventDefault()
		if (password) {
			await updateUser({ id: user.id, username, password, roles, active })
		} else {
			await updateUser({ id: user.id, username, roles, active })
		}
	}

	const onDeleteUserClicked = async () => {
		await deleteUser({ id: user.id })
	}

	const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

	const content = (
		<>
			<p>{error?.data?.message}</p>
			<form action="" onSubmit={(e) => e.preventDefault()}>
				<h2>Edit User</h2>
				<Stack gap={3}>
					<Box display="flex" gap={5}>
						<Button
							size="large"
							variant="contained"
							onClick={onUpdateUserClicked}>
							<Save />
						</Button>
						<Button
							size="large"
							variant="contained"
							onClick={onDeleteUserClicked}>
							<Delete />
						</Button>
					</Box>

					<TextField
						required
						label="Username"
						onChange={onUserNameChanged}
						value={username}
					/>

					<TextField
						label="Password"
						type="password"
						multiline
						rows={3}
						value={password}
						onChange={onPasswordChanged}
					/>

					<Box>
						<FormControlLabel
							control={
								<Checkbox
									sx={{ width: '3.5rem' }}
									checked={active}
									size="large"
									onChange={onActiveChanged}
								/>
							}
							label="Active"
						/>
					</Box>

					<FormGroup>
						<InputLabel>Assigned Roles:</InputLabel>
						<Select
							required
							multiple
							value={roles}
							onChange={onRolesChanged}
							renderValue={(selected) => selected.join(', ')}>
							{options}
						</Select>
					</FormGroup>
				</Stack>
			</form>
		</>
	)

	return content
}
