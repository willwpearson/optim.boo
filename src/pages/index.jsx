import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
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
                        <div className='flex flex-col items-center justify-between'>
                            <h1 className='text-3xl my-4'>Welcome to the secured home page!</h1>
                            <button className='p-2 rounded-lg shadow-md bg-indigo-700 hover:bg-indigo-900 text-white' onClick={()=>signOut()}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </main>}
        </>
    )
}