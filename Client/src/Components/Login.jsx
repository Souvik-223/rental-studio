import { Link } from "react-router-dom";
import {useState} from 'react'
import axios from 'axios'

export default function Login() {
    const [logindata,setlogindata] = useState({
        email:"",
        password:""
    })
    function toggledata(event){
        const [target,value] = event.target
        setlogindata(prevdata=>({
            ...prevdata,
            [target]:value
        }))
    }
    function LoginUser() {
        await axios.get('https')
    }
    return (
        <div className="grow flex justify-around items-center">
            <div className="mb-48 mx-auto">
                <h1 className="font-bold text-center text-3xl sm:text-4xl my-8" onSubmit={LoginUser}>Login</h1>
                <form className="flex flex-col gap-5 justify-center w-[30rem] mx-auto">
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="email" placeholder="your@mail.com" 
                    value={logindata.email}
                    onChange={toggledata}/>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="password" placeholder="password" value={logindata.password}
                    onChange={toggledata}/>
                    <button className="bg-pink-600 text-white font-bold rounded-full py-2">Login</button>
                    <div className="text-center">Don't have an account? <Link className="font-bold hover:underline" to={'/signup'}>Register here</Link></div>
                </form>
            </div>
        </div>
    )
}