import jwt from 'jsonwebtoken'
import { TjwtPayload } from '../../Types/jwt.types'

export const singJwt = (payload: TjwtPayload, secret: string, expiresIn: number) => jwt.sign(payload, secret, { expiresIn })

export const verifyJwt = <T>(token: string, secret: string): T | null => {
    try {
        const decoded = jwt.verify(token, secret) as T
        return decoded
    } catch (error) {
        return null
    }
} 