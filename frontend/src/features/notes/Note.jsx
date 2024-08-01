import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'

import { useGetNotesQuery } from './notesApiSlice'

function Note({ noteId }) {
	const navigate = useNavigate()

	const { note } = useGetNotesQuery('notesList', {
		selectFromResult: ({ data }) => ({
			note: data?.entities[noteId],
		}),
	})

	if (note) {
		const created = new Date(note.createdAt).toLocaleString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})

		const updated = new Date(note.updatedAt).toLocaleString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})

		const handleEdit = () => navigate(`/dash/notes/${noteId}`)

		return (
			<tr>
				<td>{note.completed ? <span>Completed</span> : <span>Open</span>}</td>
				<td>{created}</td>
				<td>{updated}</td>
				<td>{note.title}</td>
				<td>{note.username}</td>
				<td>
					<button onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			</tr>
		)
	} else return null
}

const memoizedNote = memo(Note)

export default memoizedNote
