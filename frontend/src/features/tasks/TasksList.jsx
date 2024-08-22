import React from 'react'
import { useGetTasksQuery } from './tasksApiSlice'
import Task from './Task'
import useAuth from '../../hooks/useAuth'

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

	// console.log(tasks)

	if (isSuccess) {
		const { ids, entities } = tasks
    console.log(ids)
    console.log(entities);
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
			<table>
				<thead>
					<tr>
						<th>Status</th>
						<th>Created</th>
						<th>Updated</th>
						<th>Title</th>
						<th>Owner</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		)
	}

	return content
}
