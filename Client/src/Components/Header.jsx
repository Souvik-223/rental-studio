import {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/usercontext'

export default function Header() {
    const {User} = useContext(UserContext)
    const [hamburger,sethamburger] = useState(false)
    function togglehamburger(){
      sethamburger((prevburger)=>!prevburger)
    }
    return(
        <header className='flex justify-between'>
        <Link to={"/"} className='flex items-center'> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-10 h-10 ml-2 mr-1 text-[#ff385c]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
          <div className='font-bold text-2xl'>Rental <span className='text-red-600'>Studio</span> </div>
        </Link>
        <div className='flex gap-2 font-semibold text-sm rounded-full shadow shadow-black px-4 py-1 my-3 items-center'>
          <div>Anywhere</div>
          <div className='border border-l-2 border-gray-300 h-full'></div>
          <div>Any Time</div>
          <div className='border border-l-2 border-gray-300 h-full'></div>
          <div>Add Guests</div>
          <div className='bg-[#ff385c] rounded-full p-3 h-10 w-10 text-white flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
        <div className='flex gap-2 px-4 mx-5 rounded-full border-2 border-gray-200 my-3 justify-center items-center'>
          <button onClick={togglehamburger}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <Link to={User? "/account":"/login"}className='bg-gray-600 text-white rounded-full p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </Link>
          {User &&(
            <div className='font-bold text-md text-black'>
              {User.name}
            </div>
          )
          }
          <ul className={`py-2 px-3 bg-slate-50 absolute top-[4rem] right-[2.5rem] border-2 border-gray-200 shaodw-md shadow-gray-200 rounded-2xl w-28 ${hamburger? "Visible" : "hidden"}`}>
            <li className='font-semibold py-2 hover:bg-gray-200 px-2 rounded-xl cursor-pointer'><Link to={"/signup"}>Signup</Link></li>
            <li className='py-2 hover:bg-gray-200 px-2 rounded-xl cursor-pointer'><Link to={"/login"}>Login</Link></li>
          </ul>
        </div>
      </header>
    )
}