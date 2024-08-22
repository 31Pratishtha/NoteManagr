import React from 'react'
import { Container, Typography, Drawer } from '@mui/material'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

export default function DashLayout() {
	return (
		<>
			<DashHeader />
			<Container maxWidth="lg">
				
				<div>
					<Outlet />
				</div>
			</Container>
			<DashFooter />
		</>
	)
}
