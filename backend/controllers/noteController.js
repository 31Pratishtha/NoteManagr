import User from '../models/User.js'
import Note from '../models/Note.js'
import asyncHandler from 'express-async-handler'

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find().lean()
	if (!notes?.length) {
		return res.status(400).json({ message: 'No notes found' })
	}

	//add the username to each user
	const notesWithUser = await Promise.all(
		notes.map(async (note) => {
			const user = await User.findById(note.user).lean().exec()
			return { ...note, username: user?.username || 'Unknown' }
		})
	)
	res.json(notesWithUser)
})

// @desc create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
	const { user, title, text } = req.body

	//confirm data
	if (!user || !title || !text) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	//check duplicate note
	const duplicate = await Note.findOne({ title })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec()

	if (duplicate) {
		return res.status(409).json({ message: 'Duplicate note titile' })
	}

	const noteObject = { user, title, text }
	const note = await Note.create(noteObject)

	//verify if user exists
	const userExists = await User.findById(user).exec()
	console.log(userExists)
	if (!note || !userExists) {
		return res.status(400).json({
			message: 'Invalid note data received or the user does not exist',
		})
	}
	res.status(201).json({ message: `New note '${title}' created` })
})

// @desc update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
	const { id, user, title, text, completed } = req.body

	// Confirm data
	if (!id || !user || !title || !text || typeof completed !== 'boolean') {
		return res.status(400).json({ message: 'All fields are required' })
	}

	const note = await Note.findById(id).exec()

	if (!note) {
		return res.status(400).json({ message: 'Note not found' })
	}

	//check duplicate note
	const duplicate = await Note.findOne({ title })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec()

	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: 'Duplicate note titile' })
	}

	note.user = user
	note.title = title
	note.text = text
	note.completed = completed

	const updatedNote = await note.save()

	res.json(`Note with title '${updatedNote.title}' updated`)
})

// @desc delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
	const { id } = req.body

	if (!id) {
		return res.status(400).json({ message: 'Note ID required' })
	}

	const note = await Note.findById(id).exec()

	if (!note) {
		return res.status(400).json({ message: 'Note not found' })
	}

	const result = await note.deleteOne()

	if (result.deletedCount === 0) {
		return res.status(400).json({ message: 'Note deletion failed' })
	}
	const reply = `Note ${note.title} with ID ${note._id} deleted`

	res.json(reply)
})

export { getAllNotes, createNewNote, updateNote, deleteNote }
