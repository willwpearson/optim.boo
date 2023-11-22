# User Authentication and Registration with Duende IdentityServer

This is documentation describing how to configure this Next.js project to handle user login and registration with forms and NextAuth.

*Assuming the Pages router is being used.*

## Table of Contents

1. [Login](#login)
2. [Registration](#registration)
3. [IdentityServer Configuration](#identityserver-configuration)

## Login

*This project uses the `components` folder to handle any reusable components. If you don't already have one, add it to the `src` directory.*

First, we need to install NextAuth as a dependency. We'll be using this to handle authentication and send requests to Duende.

```bash
npm install next-auth
```

Next, we want to create a login form to handle user input. In the `components` directory, add the following `LoginForm.jsx` component:

```javascript
import { useState } from 'react'

/***
 * Login form.
 */
const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /***
     * Handles submission of the form.
     */
    const handleSubmit = (e) => {
        e.preventDefault()

        onSubmit({ username, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col my-4'>
                <input className='rounded-lg my-2' type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input className='rounded-lg my-2' type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button className='rounded-lg shadow-md my-2 p-2 bg-violet-700 hover:bg-violet-900 text-white' type="submit">Login</button>
            </div>
        </form>
    )
}

/***
 * Main export function
 */
export default LoginForm
```

This form takes in the inputs "username" and "password" and handles submission through it's parent component.

Now, we want to create a login page. This is usually done in a `pages/accounts` directory, so create that now, and add the following `login.jsx` page to it:

```javascript
import { signIn } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

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
                    <div className="flex my-2">
                        <p className="mx-2">Don't have an account?</p>
                        <Link href='/account/register'>
                            <p className="text-blue-500 hover:text-blue-800">Sign up here!</p>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
```

The extra "Sign up here!" link will be useful for adding registration later.

This login page checks if a session is valid, and routes the user to the home page. If a session is not valid, the form is displayed, and the user can attempt to log in, using NextAuth to authenticate with Duende.

Lastly, we need to setup NextAuth to process the login and send a request to Duende for authentication.

Add the following `[...nextauth.js]` file, in the `api/auth` directory:

```javascript
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const response = await fetch('URI of IdentityServer/connect/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            grant_type: 'password',
                            client_id: process.env.DUENDE_IDS6_ID,
                            client_secret: process.env.DUENDE_IDS6_SECRET,
                            username: credentials.username,
                            password: credentials.password,
                            scope:  "openid profile offline_access api1"
                        }),
                    })
        
                    const data = await response.json()
        
                    if (response.ok && data.access_token){
                        return Promise.resolve({
                            id: data.user_id,
                            name: data.user_name
                        })
                    } else {
                        return Promise.resolve(null)
                    }
                } catch (error) {
                    console.error('Authentication error: ', error)
                    return Promise.resolve(null)
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        },
        async jwt({ token, user }) {
            if (user){
                token.accessToken = user.accessToken
            }
            return token
        }
    },
    pages: {
        signIn: '/account/login'
    }
})
```

This sets up the NextAuth configuration to handle credentials passed through a form, and request authentication from the IdentityServer.

The last thing we need to setup for login is the `.env` file. Add the following variables to the environment variables:

```c#
DUENDE_IDS6_ID="ID of Next.js client in IdentityServer"
DUENDE_IDS6_SECRET="Secret of Next.js client in IdentityServer"
```

With all that set up, the client should now be able to use a login form to request authentication tokens from the IdentityServer.

## Registration

In order to configure registration for the Next.js project, we need to create a new page.

In the `account` directory, create the `register.jsx` file.

Here we'll configure the page to verify a user and add them to the database through IdentityServer.

Add the import statements for the components we need:

```javascript
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
```

Next, setup the page and form:

```javascript
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
     * Handles form fields changing.
     */
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
```

This sets up the registration form with a few things. We handle form fields updating, a link back to the login page, as well as create the page to display to the user. This also has fields to validate the password, and can display if the password is incorrect.

Now we need to add the method to actually handle the registration form being submitted.

Add the following handler method to the `RegistrationPage`:

```javascript
/***
 * Handles the registration form submission.
 */
const handleFormRegister = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.passveri){
        setPassValid(false)
    } else {
        try {
            const registrationResponse = await fetch("URI of IdentityServer/api/registration", {
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
```

This handler does a few things. First, it verifies that the password was entered correctly and validated. Then, it makes a call to the API registration endpoint of the IdentityServer, using the form data as the JSON request. If the request is approved and the user is registered, the user is routed back to the login page, and can login with their new login. Otherwise, an error is printed and can be handled in different ways.

That's all for registration! With the page properly set up, as long as the IdentityServer has the API endpoint configured to receive the request, a user should be able to register for the application.

## IdentityServer Configuration

If you want to configure an IdentityServer project to handle login and registration requests from a Next.js client, follow the documentation [here](https://github.com/willwpearson/identity.optim.boo/blob/main/documentation/NextJSClient.md).
