import React, { useEffect, useState } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'

export default function EditNoteForm({ note, users }) {
	const navigate = useNavigate()
	const { isManager, isAdmin } = useAuth()
	const [updateNote, { isLoading, isError, error, isSuccess }] =
		useUpdateNoteMutation()

	const [
		deleteNote,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delError },
	] = useDeleteNoteMutation()

	const [title, setTitle] = useState(note.title)
	const [text, setText] = useState(note.text)
	const [completed, setCompleted] = useState(note.completed)
	const [userId, setUserId] = useState(note.user)

	const created = new Date(note.createdAt).toLocaleString('en-us', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})
	const updated = new Date(note.updatedAt).toLocaleString('en-us', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setTitle('')
			setText('')
			setUserId('')
			navigate('/dash/notes')
		}
	}, [isSuccess, isDelSuccess, navigate])

	const onUpdateNoteClicked = async (e) => {
		e.preventDefault()
		await updateNote({
			id: note.id,
			user: userId,
			title,
			text,
			completed,
		})
	}
	const onDeleteNoteClicked = async (e) => {
		e.preventDefault()
		await deleteNote({ id: note.id })
	}

	const onTitleChanged = (e) => {
		setTitle(e.target.value)
	}
	const onTextChanged = (e) => {
		setText(e.target.value)
	}
	const onStatusChanged = (e) => {
		setCompleted((prev) => !prev)
	}
	const onUserIdChanged = (e) => {
		setUserId(e.target.value)
	}

	const options = users.map((user) => {
		return (
			<option value={user.id} key={user.id}>
				{user.username}
			</option>
		)
	})

	const errorContent = (error?.data?.message || delError?.data?.message) ?? ''

	let deleteNoteButton = null
	if (isManager || isAdmin) {
		deleteNoteButton = (
			<button onClick={onDeleteNoteClicked}>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		)
	}
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
						{deleteNoteButton}
					</div>
				</div>

				<label htmlFor="title">Title:</label>
				<input type="text" id="title" value={title} onChange={onTitleChanged} />

				<label htmlFor="text">Description:</label>
				<textarea id="text" value={text} onChange={onTextChanged}></textarea>

				<label htmlFor="status">Status:</label>
				<input type="checkbox" checked={completed} onChange={onStatusChanged} />

				<label htmlFor="user">Assigned To:</label>
				<select id="userId" value={userId} onChange={onUserIdChanged}>
					{options}
				</select>

				<div>
					<p>
						Created At: <br /> {created}
					</p>
					<p>
						Updated At: <br /> {updated}
					</p>
				</div>
			</form>
		</>
	)

	return content
}
