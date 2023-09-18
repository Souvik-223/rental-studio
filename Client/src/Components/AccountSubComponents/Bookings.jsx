import { Navigate } from 'react-router-dom'
import AccountNav from './AccountNav'

function bookaplace(){
  return (<Navigate to={'/'}/>)
}

export default function Places({ User, logout }) {
  return (
    <>
      <AccountNav/>
      <div className="text-center mx-auto max-w-lg mt-14">
        <p className="font-bold text-lg">Apparently {User ? User.name : ""} dosen't seem to have any bookings.</p>
        <br />
        <button onClick={bookaplace} className="w-full py-2 px-6 font-bold rounded-full bg-[#ff385c] text-white max-w-md">Book a Place now</button>
      </div>
    </>
  )
}
