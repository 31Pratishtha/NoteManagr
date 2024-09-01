import React from 'react'
import { useGetTasksQuery } from './tasksApiSlice'
import useAuth from '../../hooks/useAuth'
import { Edit } from '@mui/icons-material'
import { Paper, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'

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
	const navigate = useNavigate()

	let content

	if (isLoading) content = <p>Loading...</p>

	if (isError) content = <p>{error?.data?.message}</p>

	const rows = []

	if (isSuccess) {
		const { ids, entities } = tasks
		let filteredIds

		if (isAdmin || isManager) {
			filteredIds = [...ids]
		} else {
			filteredIds = ids.filter(
				(taskId) => entities[taskId].username === username
			)
		}

		filteredIds.map((taskId) => {
			let oneEntity = entities[taskId]

			const created = new Date(oneEntity.createdAt).toLocaleString('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})

			const updated = new Date(oneEntity.updatedAt).toLocaleString('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})

			rows.push({
				id: oneEntity.id,
				status: oneEntity.completed ? 'Completed' : 'Open',
				created: created,
				updated: updated,
				title: oneEntity.title,
				assignedTo: oneEntity.username,
			})
		})

		const columns = [
			{ field: 'status', headerName: 'Status', width: 150 },
			{ field: 'created', headerName: 'Created', flex: 1.5 },
			{ field: 'updated', headerName: 'Updated', flex: 1.5 },
			{ field: 'title', headerName: 'Title', flex: 2 },
			{ field: 'assignedTo', headerName: 'Assigned To', flex: 2 },
			{
				field: 'edit',
				headerName: 'Edit',
				renderCell: (params) => (
					<Button
						variant="outlined"
						onClick={() => navigate(`/dash/tasks/${params.id}`)}>
						<Edit />
					</Button>
				),
			},
		]

		content = (
			<Paper sx={{ height: '32rem', marginY: '2rem' }}>
				<DataGrid
					sx={{ paddingX: '2rem' }}
					columns={columns}
					rows={rows}
					pageSizeOptions={[5, 10, 25]}
					initialState={{
						pagination: {
							paginationModel: { pageSize: 25 },
						},
					}}
				/>
			</Paper>
		)

		return content
	}

	return null
}
