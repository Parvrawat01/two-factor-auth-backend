export type TjwtPayload = {
    userId: string
    stage: 'password' | 'auth-code'
}