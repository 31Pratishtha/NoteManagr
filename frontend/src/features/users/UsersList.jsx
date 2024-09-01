import React, { useEffect } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import useTitle from '../../hooks/useTitle'
import { Edit } from '@mui/icons-material'
import { Paper, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'

export default function UsersList() {
	useTitle('Users')
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})

	const navigate = useNavigate()

	let content

	if (isLoading) content = <p>Loading...</p>

	if (isError) content = <p>{error?.data?.message}</p>

	const rows = []

	if (isSuccess) {
		const { ids, entities } = users
		ids?.length &&
			ids.map((userId) => {
				let oneEntity = entities[userId]
				const userRoleString = oneEntity.roles.toString().replaceAll(',', ', ')
				rows.push({
					id: userId,
					username: oneEntity.username,
					roles: userRoleString,
				})
			})

		const columns = [
			{ field: 'username', headerName: 'Username', flex: 1 },
			{ field: 'roles', headerName: 'Roles', flex: 1 },
			{
				field: 'edit',
				headerName: 'Edit',
				renderCell: (params) => (
					<Button
						variant="outlined"
						onClick={() => navigate(`/dash/users/${params.id}`)}>
						<Edit />
					</Button>
				),
			},
		]

		content = (
			<Paper sx={{ height: '32rem', marginY: '2rem' }}>
				<DataGrid
					sx={{ paddingX: '5rem' }}
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
	}

	return content
}
