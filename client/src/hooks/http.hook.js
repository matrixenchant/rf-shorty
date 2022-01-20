import { useCallback, useState } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}, type = 'json') => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            let data = {}

            if (type === 'json') data = await response.json()
            if (type === 'text') data = await response.text()

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            throw e
        }
    }, [])

    return { loading, request }
}