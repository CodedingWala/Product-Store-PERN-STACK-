// frontend/hooks/useAuthReq.js
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useRef } from 'react'
import api from '../lib/axios'

function useAuthReq() {
    const { isSignedIn, isLoaded, getToken } = useAuth()
    const interceptorRef = useRef(null)

    useEffect(() => {
        // Clean up previous interceptor
        if (interceptorRef.current) {
            api.interceptors.request.eject(interceptorRef.current)
            interceptorRef.current = null
        }

        const interceptor = api.interceptors.request.use(
            async (config) => {
                if (isSignedIn) {
                    try {
                        const token = await getToken()
                        if (token) {
                            config.headers.Authorization = `Bearer ${token}`
                            console.log('✅ Token added to request:', config.url)
                        } else {
                            console.warn('⚠️ No token available, user might not be signed in')
                        }
                    } catch (error) {
                        console.error('❌ Error getting token:', error)
                    }
                } else {
                    console.log('ℹ️ User not signed in, no token added')
                }
                return config
            },
            (error) => {
                console.error('❌ Request interceptor error:', error)
                return Promise.reject(error)
            }
        )

        interceptorRef.current = interceptor

        return () => {
            if (interceptorRef.current) {
                api.interceptors.request.eject(interceptorRef.current)
                interceptorRef.current = null
            }
        }
    }, [isSignedIn, getToken])

    return { isSignedIn, isClerkLoaded: isLoaded }
}

export default useAuthReq