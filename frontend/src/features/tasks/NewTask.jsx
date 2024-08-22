import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewTaskForm from './NewTaskForm'
import PulseLoader from 'react-spinners/PulseLoader'

export default function NewTask() {
	const users = useSelector(selectAllUsers)

	// if (!users?.length) return <PulseLoader color="#FFF" />

	if (!users || users.length === 0) {
		return <PulseLoader color="#FFF" />
	}

	const content = <NewTaskForm users={users} />

	return content
}
