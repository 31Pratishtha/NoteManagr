import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@mui/material'

export default function Public() {
	const content = (
		<Container component="section" className="public">
			<header>
				<h1>
					Welcome to <span className="nowrap">WindzTasksManager</span>
				</h1>
			</header>
			<main className="public__main">
				<h2>Streamline Your Workflow</h2>
				<p>
					Effortlessly manage your tasks, track progress, and collaborate in
					real-time with WindzTasksManager. Designed for teams and individuals
					who value efficiency, our tool brings simplicity to task management.
					Dive in and take control of your productivity today!"
				</p>
				<br />
			</main>
			<footer>
				<Link to="/login">Employee Login</Link>
			</footer>
		</Container>
	)
	return content
}
