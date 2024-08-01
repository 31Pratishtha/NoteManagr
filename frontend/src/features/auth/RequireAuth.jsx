import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function RequireAuth({ allowedRoles }) {
	const location = useLocation()
	const { roles } = useAuth()

	const content = roles.some((role) => allowedRoles.includes(role)) ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace state={{from : location}}/>
	)

	return content
}


