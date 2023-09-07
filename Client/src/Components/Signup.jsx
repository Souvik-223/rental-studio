import { Link } from "react-router-dom"
import { useState } from "react"

export default function Signup() {
    const [signupdata,setsignupdata] = useState({
        name:"",
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
    return (
        <div className="grow flex justify-around items-center">
            <div className="mb-36 mx-auto">
                <h1 className="font-bold text-center text-3xl sm:text-4xl my-8">Signup</h1>
                <form className="flex flex-col gap-5 justify-center w-[30rem] mx-auto">
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="text" placeholder="yourname" 
                    value={logindata.email}
                    onChange={toggledata}/>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="email" placeholder="your@mail.com" 
                    value={logindata.email}
                    onChange={toggledata}/>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="password" placeholder="password" 
                    value={logindata.email}
                    onChange={toggledata}/>
                    <button className="bg-pink-600 text-white font-bold rounded-full py-2">Sign Up</button>
                    <div className="text-center">Already a member? <Link className="font-bold hover:underline" to={'/login'}>Login</Link></div>
                </form>
            </div>
        </div>
    )
}