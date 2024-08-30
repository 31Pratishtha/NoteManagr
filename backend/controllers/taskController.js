import User from '../models/User.js'
import Task from '../models/Task.js'
import asyncHandler from 'express-async-handler'

// @desc Get all tasks
// @route GET /tasks
// @access Private
const getAllTasks = asyncHandler(async (req, res) => {
	const tasks = await Task.find().lean()
	if (!tasks?.length) {
		return res.status(400).json({ message: 'No tasks found' })
	}

	//add the username to each user
	const tasksWithUser = await Promise.all(
		tasks.map(async (task) => {
			const user = await User.findById(task.user).lean().exec()
			return { ...task, username: user?.username || 'Unknown' }
		})
	)
	res.json(tasksWithUser)
})

// @desc create new task
// @route POST /tasks
// @access Private
const createNewTask = asyncHandler(async (req, res) => {
	const { user, title, text } = req.body

	//confirm data
	if (!user || !title || !text) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	//check duplicate task
	const duplicate = await Task.findOne({ title })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec()

	if (duplicate) {
		return res.status(409).json({ message: 'Duplicate task titile' })
	}

	const taskObject = { user, title, text }
	const task = await Task.create(taskObject)

	//verify if user exists
	const userExists = await User.findById(user).exec()
	console.log(userExists)
	if (!task || !userExists) {
		return res.status(400).json({
			message: 'Invalid task data received or the user does not exist',
		})
	}
	res.status(201).json({ message: `New task '${title}' created` })
})

// @desc update a task
// @route PATCH /tasks
// @access Private
const updateTask = asyncHandler(async (req, res) => {
	const { id, user, title, text, completed } = req.body

	// Confirm data
	if (!id || !user || !title || !text || typeof completed !== 'boolean') {
		return res.status(400).json({ message: 'All fields are required' })
	}

	const task = await Task.findById(id).exec()

	if (!task) {
		return res.status(400).json({ message: 'Task not found' })
	}

	//check duplicate task
	const duplicate = await Task.findOne({ title })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec()

	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: 'Duplicate task titile' })
	}

	task.user = user
	task.title = title
	task.text = text
	task.completed = completed

	const updatedTask = await task.save()

	res.json(`Task with title '${updatedTask.title}' updated`)
})

// @desc delete a task
// @route DELETE /tasks
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
	const { id } = req.body

	if (!id) {
		return res.status(400).json({ message: 'Task ID required' })
	}

	const task = await Task.findById(id).exec()

	if (!task) {
		return res.status(400).json({ message: 'Task not found' })
	}

	const result = await task.deleteOne()

	if (result.deletedCount === 0) {
		return res.status(400).json({ message: 'Task deletion failed' })
	}
	const reply = `Task ${task.title} with ID ${task._id} deleted`

	res.json(reply)
})

export { getAllTasks, createNewTask, updateTask, deleteTask }
