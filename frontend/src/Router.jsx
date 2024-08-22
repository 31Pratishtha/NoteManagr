import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import TasksList from './features/tasks/TasksList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import EditTask from './features/tasks/EditTask'
import NewTask from './features/tasks/NewTask'
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
												path: 'tasks',
												children: [
													{ index: true, element: <TasksList /> },
													{ path: ':id', element: <EditTask /> },
													{ path: 'new', element: <NewTask /> },
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
