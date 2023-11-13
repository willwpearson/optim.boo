import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home(){
    const { data: session, status } = useSession()
    const router = useRouter()

    // Redirect to the login page if the session is not authenticated.
    useEffect(()=> {
        if(status !== 'authenticated') {
            // Redirect if not authenticated.
            router.push('/account/login')
        }
    }, [status, router])

    // Loading state
    if(status === 'loading'){
        return <p>Loading...</p>
    }

    return (
        <>
            {session && <main className='w-screen h-screen bg-gradient-to-b from-indigo-500 to-purple-800'>
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-1/3 h-1/2 bg-white rounded-lg shadow-lg flex justify-center items-center'>
                        <h1 className='text-3xl'>Welcome to the secured home page, {session.user.name}!</h1>
                    </div>
                </div>
            </main>}
        </>
    )
}