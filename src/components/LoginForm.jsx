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
                <button className='border-2 border-black rounded-lg shadow-lg my-2 p-2 hover:bg-gray-200' type="submit">Login</button>
            </div>
        </form>
    )
}

/***
 * Main export function
 */
export default LoginForm