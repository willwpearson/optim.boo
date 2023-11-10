import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home(){
    const { data: session, status } = useSession()
    const router = useRouter()

    // Redirect to the login page if the session is not authenticated.
    useEffect(()=> {
        console.log(status)
        if(status === 'authenticated') {
            // User is authenticated, proceed with render.
            console.log("User is authenticated.")
            return
        }

        // Redirect if not authenticated.
        console.log("Redirecting to login.")
        router.push('/account/login')
    }, [status, router])

    // Loading state
    if(status === 'loading'){
        return <p>Loading...</p>
    }

    return (
        <main>
            {session && <h1>Welcome to secured content, {session.user.name}!</h1>}
        </main>
    )
}