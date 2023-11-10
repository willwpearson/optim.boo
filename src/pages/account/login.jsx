import { signIn } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push('/')
        } 
    }, [router, session])
    
    return (
        <main className='w-screen h-screen bg-gradient-to-b from-purple-800 to-rose-500'>
            <div className='flex justify-center items-center w-full h-full'>
                <div className="w-1/4 h-1/2 flex flex-col items-center py-2 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl mb-2">Login</h1>
                    <button className="" onClick={() => signIn('github')}>
                        Sign in with Github
                    </button>
                </div>
            </div>
        </main>
    )
}