import { signIn } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import LoginForm from "../../components/LoginForm"

/***
 * Login page.
 */
export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()

    /***
     * Validates session.
     */
    useEffect(() => {
        if (session) {
            router.push('/')
        } 
    }, [router, session])

    /***
     * Handles login form submission.
     */
    const handleLogin = async (credentials) => {
        try {
            await signIn('credentials', { ...credentials, redirect: false })
        } catch (error) {
            console.error('Authentication error: ', error)
        }
    }
    
    return (
        <main className='w-screen h-screen bg-gradient-to-b from-purple-800 to-rose-500'>
            <div className='flex justify-center items-center w-full h-full'>
                <div className="w-1/4 min-h-1/2 flex flex-col items-center justify-between py-4 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl mb-2">Login</h1>
                        <LoginForm onSubmit={handleLogin} />
                    </div>
                    <hr className="w-11/12 bg-black my-2"/>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl">Other Login Options</h1>
                        <div className="flex flex-col m-4">
                            <button className="m-2 p-2 border-2 border-purple-800 rounded-lg hover:bg-gray-200 text-purple-800" onClick={() => signIn('github')}>
                                Sign in with Github
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}