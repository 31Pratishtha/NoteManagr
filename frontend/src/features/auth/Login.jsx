import { useNavigate, Link } from 'react-router-dom'
import usePersist from '../../hooks/usePersist.jsx'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errMsg, setErrMsg] = useState('')

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

	if (isLoading) return <p>Loading...</p>

	const content = (
		<section>
			<header>
				<h1>Employee Login</h1>
			</header>
			<main>
				<p ref={errRef} aria-live="assertive">
					{errMsg}
				</p>
				<form action="" onSubmit={handleFormSubmit}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						required
						ref={userRef}
						value={username}
						onChange={handleUserInput}
					/>

					<label htmlFor="password">Password: </label>
					<input
						type="password"
						required
						value={password}
						onChange={handlePwdInput}
					/>

					<button>Log In</button>

					<label htmlFor="persist">
						<input type="checkbox" onChange={handleToggle} checked={persist} />
						Trust this device
					</label>
				</form>
			</main>
			<footer>
				<Link to="/">Back to Home</Link>
			</footer>
		</section>
	)
	return content
}
