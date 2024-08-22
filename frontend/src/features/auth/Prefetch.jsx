import React, { useEffect } from 'react'
import { store } from '../../app/store'
import { tasksApiSlice } from '../tasks/tasksApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { Outlet } from 'react-router-dom'

export default function Prefetch() {
	useEffect(() => {
		store.dispatch(
			tasksApiSlice.util.prefetch('getTasks', 'tasksList', { force: true })
		)
		store.dispatch(
			usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
		)
	}, [])
	return <Outlet />
}
