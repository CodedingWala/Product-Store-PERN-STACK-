import React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import api from '../lib/axios'

let isInterceptedRegistered = false
function useAuthReq() {
    const { isSignedIn, isLoaded, getToken } = useAuth()
    useEffect(() => {
        if (isInterceptedRegistered) return
        isInterceptedRegistered = true
        const interceptor = api.interceptors.request.use(async (config) => {
            if (isSignedIn) {
                const token = await getToken()
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                    console.log("✅ Token added:", config.headers.Authorization.substring(0, 20) + '...')
                }
            }
            return config
        })

        return () => {
            api.interceptors.request.eject(isInterceptedRegistered)
            isInterceptedRegistered = false
        }
    }, [isSignedIn, getToken])

    return { isSignedIn, isClerkLoaded: isLoaded };

}

export default useAuthReq
