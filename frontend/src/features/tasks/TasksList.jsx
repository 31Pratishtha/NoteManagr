import React from 'react'
import { useGetTasksQuery } from './tasksApiSlice'
import Task from './Task'
import useAuth from '../../hooks/useAuth'

import { TableContainer, Table, TableHead, TableBody, Paper, TableRow, TableCell } from '@mui/material'

export default function TasksList() {
	const {
		data: tasks,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTasksQuery(undefined, {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})

	const { username, isAdmin, isManager } = useAuth()

	let content

	if (isLoading) content = <p>Loading...</p>

	if (isError) content = <p>{error?.data?.message}</p>

	if (isSuccess) {
		const { ids, entities } = tasks
		console.log(ids)
		console.log(entities)
		let filteredIds

		if (isAdmin || isManager) {
			filteredIds = [...ids]
		} else {
			filteredIds = ids.filter(
				(taskId) => entities[taskId].username === username
			)
			console.log(filteredIds)
		}

		const tableContent =
			ids?.length &&
			filteredIds.map((taskId) => <Task key={taskId} taskId={taskId} />)

		content = (
			<TableContainer component={Paper} sx={{margin: '2rem 0rem'}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Status</TableCell>
							<TableCell>Created</TableCell>
							<TableCell>Updated</TableCell>
							<TableCell>Title</TableCell>
							<TableCell>Owner</TableCell>
							<TableCell>Edit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{tableContent}</TableBody>
				</Table>
			</TableContainer>
		)
	}

	return content
}
