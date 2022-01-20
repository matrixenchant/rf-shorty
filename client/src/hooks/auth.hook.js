import { useCallback, useEffect, useState } from "react"

const storageUser = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback( async (jwtToken, id, save = true) => {
        try {
            setToken(jwtToken)

            if (save)
            localStorage.setItem(storageUser, JSON.stringify({
                userId: id, token: jwtToken
            }))
        } catch (e) {
            console.log(e)
            localStorage.removeItem(storageUser)
        }
    }, [] )
    const logout = useCallback( () => {
        setToken(null)

        localStorage.removeItem(storageUser)
    }, [] )

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem(storageUser))
            if (data && data.token) {
                login(data.token, data.userId, false)
            }
            setReady(true)
        } catch (error) {
            if (error.name === 'SyntaxError') localStorage.removeItem(storageUser)
            setReady(false)
        }
    }, [login])

    return { login, logout, token, ready }
}