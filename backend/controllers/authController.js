import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

//@desc Login
//@route POST /auth
//@access public
const login = asyncHandler(async (req, res) => {
	const { username, password } = req.body

	if (!username || !password)
		return res.status(400).json({ message: 'All fields are required.' })

	const foundUser = await User.findOne({ username }).exec()

	if (!foundUser || !foundUser.active)
		return res.status(401).json({ message: 'Unauthorized' })

	const match = bcrypt.compare(password, foundUser.password)

	if (!match) return res.status(401).json({ message: 'Unauthorized' })

	const accessToken = jwt.sign(
		{
			userinfo: {
				username: foundUser.username,
				roles: foundUser.roles,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '1m' }
	)

	const refreshToken = jwt.sign(
		{ username },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '1d' }
	)

	res.cookie('jwt', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	})

	res.json({ accessToken })
})

//@desc Refresh
//@route GET /auth/refresh
//@access public
const refresh = asyncHandler(async (req, res) => {
	const cookies = req.cookies

	if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

	const refreshToken = cookies.jwt

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		asyncHandler(async (err, decoded) => {
			if (err) return res.status(403).json({ message: 'Forbidden' })

			const foundUser = await User.findOne({ username: decoded.username })

			if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

			const accessToken = jwt.sign(
				{
					userinfo: {
						username: foundUser.username,
						roles: foundUser.roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '1m' }
			)

			res.json({ accessToken })
		})
	)
})

//@desc Login
//@route POST /auth/logout
//@access public
const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(204) //no content

    res.clearCookie('jwt', {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	})

    res.json({message: 'Cookie cleared'})
})

export { login, refresh, logout }
