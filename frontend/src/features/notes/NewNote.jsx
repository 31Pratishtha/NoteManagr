import React from 'react'
import { useGetUsersQuery } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'

export default function NewNote() {
	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.ids.map((id) => data.entities[id]),
		}),
	})

	if (!users?.length) return <PulseLoader color="#FFF" />

	const content = <NewNoteForm users={users} />

	return content
}
