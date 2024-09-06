import { useNavigate, Link } from 'react-router-dom'
import usePersist from '../../hooks/usePersist.jsx'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import {
	Paper,
	Grid,
	Container,
	Box,
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
	useTheme,
} from '@mui/material'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const theme = useTheme()
	
	const [persist, setPersist] = usePersist()

	const userRef = useRef()
	const errRef = useRef()

	const [login, { isLoading }] = useLoginMutation()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('')
	}, [username, password])

	const handleUserInput = (e) => setUsername(e.target.value)
	const handlePwdInput = (e) => setPassword(e.target.value)
	const handleToggle = () => setPersist((prev) => !prev)

	const handleFormSubmit = async (e) => {
		e.preventDefault()
		try {
			const { accessToken } = await login({ username, password }).unwrap()
			dispatch(setCredentials({ accessToken }))
			setUsername('')
			setPassword('')
			navigate('/dash')
		} catch (err) {
			if (!err.status) {
				setErrMsg('No Server Response')
			} else if (err.status === 400) {
				setErrMsg('Missing Username or Password')
			} else if (err.status === 401) {
				setErrMsg('Unauthorized')
			} else {
				setErrMsg(err.data?.message)
			}
			errRef.current?.focus()
			console.log(err)
		}
	}

	const handleDemoAcc = () => {
		setUsername('Manson')
		setPassword('!abcd')
		console.log(username)
		console.log(password)
	}

	if (isLoading) return <p>Loading...</p>

	const content = (
		<Container>
			<Box
				sx={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Paper
					component="section"
					elevation={10}
					sx={{ maxHeight: '70%', width: '80%', display: 'flex' }}>
					<Grid container align="center" md={{}}>
						<Grid item xs={12} md={6} sx={{ height: '100%' }}>
							<Box sx={{ height: '100%', overflow: 'hidden' }}>
								<img
									src="src/assets/login.webp"
									alt="notesss"
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
										objectPosition: '0px -8rem',
									}}
								/>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Box
								sx={{
									width: '85%',
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem',
								}}>
								<h1>Employee Login</h1>
								{errMsg ? (
									<p ref={errRef} aria-live="assertive">
										{errMsg}
									</p>
								) : null}

								<Box
									component="form"
									sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
									action=""
									onSubmit={handleFormSubmit}>
									<TextField
										size="small"
										label="Username"
										placeholder="Enter Username"
										fullWidth
										required
										ref={userRef}
										value={username}
										onChange={handleUserInput}
									/>

									<TextField
										size="small"
										label="Password"
										placeholder="Enter Password"
										fullWidth
										type="password"
										required
										value={password}
										onChange={handlePwdInput}
									/>
									<FormControlLabel
										htmlFor="persist"
										control={<Checkbox defaultChecked />}
										onChange={handleToggle}
										checked={persist}
										label="Trust this device"
									/>

									<Button onClick={handleDemoAcc} fullWidth variant="contained">
										Use Demo account
									</Button>
									<Button type="submit" fullWidth variant="outlined">
										Log In
									</Button>
								</Box>
								<Link to="/">Back to Home</Link>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Container>
	)
	return content
}
