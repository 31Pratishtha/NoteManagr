import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'

export default function EditNote() {
	const { id } = useParams()

	const { note } = useGetNotesQuery('notesList', {
		selectFromResult: ({ data }) => ({
			note: data?.entities[id],
		}),
	})

	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data.entities[id]),
		}),
	})

	const content =
		note && users ? (
			<EditNoteForm users={users} note={note} />
		) : (
			<p>Loading...</p>
		)

	return content
}
