import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'
import useAuth from '../../hooks/useAuth'

export default function NotesList() {
	const {
		data: notes,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetNotesQuery(undefined, {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})

	const { username, isAdmin, isManager } = useAuth()

	let content

	if (isLoading) content = <p>Loading...</p>

	if (isError) content = <p>{error?.data?.message}</p>

	// console.log(notes)

	if (isSuccess) {
		const { ids, entities } = notes
    console.log(ids)
    console.log(entities);
		let filteredIds

		if (isAdmin || isManager) {
			filteredIds = [...ids]
		} else {
			filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
			)
      console.log(filteredIds)
		}

		const tableContent =
			ids?.length && 
			filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)

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
