import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast'

export default function Signup() {
    const [signupdata,setsignupdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    function toggledata(event){
        const {name,value} = event.target
        setsignupdata(prevdata=>({
            ...prevdata,
            [name]:value
        }))
    }
    async function SigninUser(event) {
        event.preventDefault();
        try {
            await axios.post('/signup',signupdata)
            toast.success('Registration Successfull')
        } catch (error) {
            toast.error("Registration Failed")
        }
    }
    return (
        <div className="grow flex justify-around items-center">
            <div className="mb-36 mx-auto">
                <h1 className="font-bold text-center text-3xl sm:text-4xl my-8">Signup</h1>
                <form className="flex flex-col gap-5 justify-center w-[30rem] mx-auto" onSubmit={SigninUser}>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="text" name="name" placeholder="yourname" 
                    value={signupdata.name}
                    onChange={toggledata}/>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="email" name="email" placeholder="your@mail.com" 
                    value={signupdata.email}
                    onChange={toggledata}/>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="password" name="password" placeholder="password" 
                    value={signupdata.password}
                    onChange={toggledata}/>
                    <button className="bg-pink-600 text-white font-bold rounded-full py-2" type="submit">Sign Up</button>
                    <div className="text-center">Already a member? <Link className="font-bold hover:underline" to={'/login'}>Login</Link></div>
                </form>
            </div>
        </div>
    )
}