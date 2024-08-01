import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import NewUserForm from './features/users/NewUserForm'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			//children routes
			//public Routes
			{ index: true, element: <Public /> },
			{ path: 'login', element: <Login /> },

			//Dashboard Routes
			//protected routes
			{
				element: <PersistLogin />,
				children: [
					{
						element: <RequireAuth allowedRoles={[...Object.values(ROLES)]} />,
						children: [
							{
								element: <Prefetch />,
								children: [
									{
										path: 'dash',
										element: <DashLayout />,
										children: [
											{ index: true, element: <Welcome /> },
											{
												path: 'notes',
												children: [
													{ index: true, element: <NotesList /> },
													{ path: ':id', element: <EditNote /> },
													{ path: 'new', element: <NewNote /> },
												],
											},
											{
												element: (
													<RequireAuth
														allowedRoles={[ROLES.Admin, ROLES.Manager]}
													/>
												),
												children: [
													{
														path: 'users',
														children: [
															{ index: true, element: <UsersList /> },
															{ path: ':id', element: <EditUser /> },
															{ path: 'new', element: <NewUserForm /> },
														],
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
])

export default function Router() {
	return <RouterProvider router={router} />
}
