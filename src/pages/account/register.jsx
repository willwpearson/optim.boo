import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Link from "next/link"

/***
 * Registration page.
 */
export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passveri: ''
    })
    const [passValid, setPassValid] = useState(true)

    /***
     * Handles form input fields updating.
     */
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    /***
     * Handles the registration form submission.
     */
    const handleFormRegister = async (e) => {
        e.preventDefault()
        
        if (formData.password !== formData.passveri){
            setPassValid(false)
        } else {
            try {
                const registrationResponse = await fetch("http://identity.optim.boo/api/registration", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                })

                if (registrationResponse.ok) {
                    console.log("User registered successfully")
                    router.push('/account/login')
                } else {
                    const registrationData = await registrationResponse.json()
                    console.error("Registration error:", registrationData)
                }
            } catch (error) {
                console.error('Registration error: ', error)
            }
        }

    }

    return (
        <main className='w-screen h-screen bg-gradient-to-b from-purple-800 to-rose-500'>
            <div className='flex justify-center items-center w-full h-full'>
                <div className="w-1/4 min-h-1/2 flex flex-col items-center justify-between py-4 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl mb-2">Register</h1>
                        {!passValid &&
                            <div>
                                <p className="text-red-500">Passwords must match.</p>
                            </div>
                        }
                        <form className='flex flex-col my-2' onSubmit={handleFormRegister}>
                            <input className='rounded-lg my-2' type="text" name="username" value={formData.username} placeholder="Username" onChange={handleFormChange}/>
                            <input className='rounded-lg my-2' type="text" name="email" value={formData.email} placeholder="Email" onChange={handleFormChange}/>
                            <input className='rounded-lg my-2' type="password" name="password" value={formData.password} placeholder="Password" onChange={handleFormChange}/>
                            <input className='rounded-lg my-2' type="password" name="passveri" value={formData.passveri} placeholder="Confirm Password" onChange={handleFormChange}/>
                            <button className='m-2 p-2 rounded-lg shadow-md bg-violet-700 hover:bg-violet-900 text-white' type='submit'>Register</button>
                        </form>
                    </div>
                    <div className="flex my-2">
                        <p className="mx-2">Already have an account?</p>
                        <Link href='/account/login'>
                            <p className="text-blue-500 hover:text-blue-800">Sign in here!</p>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}