import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import { Outlet, Link } from 'react-router-dom'

export default function PersistLogin() {
	const [persist] = usePersist()
	const token = useSelector(selectCurrentToken)
	const effectRan = useRef(false) //for dev purposes as the component renders twice
	const [trueSuccess, setTrueSuccess] = useState(false)

	const [refresh, { isUninitialized, isLoading, isError, isSuccess, error }] =
		useRefreshMutation()

	useEffect(() => {
		if (
			effectRan.current === true ||
			import.meta.env.VITE_NODE_ENV !== 'development'
		) {
			const verifyRefreshToken = async () => {
				try {
					await refresh()
					setTrueSuccess(true)
				} catch (err) {
					console.log(err)
				}
			}
			if (!token && persist) verifyRefreshToken()
		}

		return () => (effectRan.current = true)
	}, [])

	let content

	if (!persist) {
		console.log('no persist')
		content = <Outlet />
	} else if (isLoading) {
		console.log('loading')
		content = <p>Loading...</p>
	} else if (isError) {
		console.log(error)
		content = (
			<p>
				{`${error?.data?.message} - `}
				<Link to="/login">Please Login Again</Link>
			</p>
		)
	} else if (isSuccess && trueSuccess) {
		console.log('success')
		content = <Outlet />
	} else if (token && isUninitialized) {
		content = <Outlet />
	}

	return content
}
