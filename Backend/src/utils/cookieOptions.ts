import config from '../config/env'

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: 'lax',
    maxAge: config.cookieExpiresIn
}