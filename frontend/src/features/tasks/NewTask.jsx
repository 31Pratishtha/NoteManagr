import React, { useEffect } from 'react'
import { store } from '../../app/store'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewTaskForm from './NewTaskForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { selectAllTasks } from './tasksApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'

export default function NewTask() {

	const users = useSelector(selectAllUsers)
	const tasks = useSelector(selectAllTasks)
	console.log('Users sel: ', users)
	console.log('Task sel: ', tasks)

	if (!users || users.length === 0) {
		return <PulseLoader color="#FFF" />
	}

	const content = <NewTaskForm users={users} />

	return content
}
