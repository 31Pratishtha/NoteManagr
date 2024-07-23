import React, { useEffect, useState } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function EditNoteForm({ note, users }) {
	const navigate = useNavigate()
	const [updateNote, { isLoading, isError, error, isSuccess }] =
		useUpdateNoteMutation()

	const [
		deleteNote,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delError },
	] = useDeleteNoteMutation()

	const [title, seTitle] = useState(note.title)
	const [text, setText] = useState(note.text)
	const [completed, setCompleted] = useState(note.completed)
	const [userId, setUserId] = useState(note.user)

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			seTitle('')
			setText('')
			setUserId('')
			navigate('/dash/notes')
		}
	}, [isSuccess, isDelSuccess, navigate])

	const onUpdateNoteClicked = async (e) => {
    e.preventDefault()
    await updateNote({id: note.id, title, title, text, completed, user: userId})
  }
	const onDeleteNoteClicked = async (e) => {
    e.preventDefault()
    await deleteNote({id: note.id})
  }

	const onTitleChanged = (e) => {e.target.value}
	const onTextChanged = (e) => {e.target.value}
	const onStatusChanged = (e) => {e.target.value}
	const onUserIdChanged = (e) => {e.target.value}

	const options = users.map((user) => {
		return (
			<option value={user.id} key={user.id}>
				{user.username}
			</option>
		)
	})

	console.log(note)
	const errorContent = (error?.data?.message || delError?.data?.message) ?? ''

	const content = (
		<>
			<p>{errorContent}</p>
			<form action="" onSubmit={(e) => e.preventDefault()}>
				<div>
					<h2>Edit Note</h2>
					<div>
						<button onClick={onUpdateNoteClicked}>
							<FontAwesomeIcon icon={faSave} />
						</button>
						<button onClick={onDeleteNoteClicked}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				</div>

				<label htmlFor="title">Title:</label>
				<input type="text" id="title" value={title} onChange={onTitleChanged} />

				<label htmlFor="text">Description:</label>
				<textarea id="text" value={text} onChange={onTextChanged}></textarea>

				<label htmlFor="status">Status:</label>
				<select id="status" value={completed} onChange={onStatusChanged}>
					<option value="true">Completed</option>
					<option value="false">Pending</option>
				</select>

				<label htmlFor="user">Assigned To:</label>
				<select id="userId" value={userId} onChange={onUserIdChanged}>
          {options}
        </select>
			</form>
		</>
	)

	return content
}
