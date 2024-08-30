import React from 'react'
import { Container, Typography, Drawer, Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

export default function DashLayout() {
	return (
		<>
			<Box
				sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
				<DashHeader />
				<Container
					maxWidth="lg"
					sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
					<Box sx={{display: 'flex', flexDirection: 'column'}}>
						<Outlet />
					</Box>
				</Container>
				<DashFooter />
			</Box>
		</>
	)
}
