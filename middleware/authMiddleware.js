import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secretKey = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1] 

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    try {
        const decoded = jwt.verify(token, secretKey)
        console.log(decoded)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({
            message: 'Invalid token'
        })
    }
}
