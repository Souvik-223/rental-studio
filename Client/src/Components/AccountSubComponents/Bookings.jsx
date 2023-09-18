import { Link, Navigate } from 'react-router-dom'
import AccountNav from './AccountNav'
import { useEffect, useState } from "react";
import axios from "axios";
import { format, differenceInCalendarDays } from 'date-fns'


export default function Places({ User }) {
  const [bookings, setbookings] = useState([])
  function bookaplace() {
    return <Navigate to={'/account'} />
  }

  useEffect(() => {
    axios.get('/booking').then(response => {
      setbookings(response.data)
    })
  }, [])
  return (
    <div>
      <AccountNav />
      {bookings?.length == 0 && (
        <div className="text-center mx-auto max-w-lg mt-14">
          <p className="font-bold text-lg">Apparently {User ? User.name : ""} dosen't seem to have any bookings.</p>
          <br />
          <button onClick={bookaplace} className="w-full py-2 px-6 font-bold rounded-full bg-[#ff385c] text-white max-w-md">Book a Place now</button>
        </div>
      )}
      {bookings?.length > 0 && bookings.map(booking => (
        <Link to={'/account/bookings/' + booking._id} className="flex gap-4 mt-8 bg-gray-200 rounded-2xl">
          <div className="flex h-48 w-48 grow shrink-0">
            {booking.place.photos?.length > 0 && (
              <img className="object-cover rounded-s-xl" src={'http://localhost:4000/' + booking.place.photos[0]} alt="image" />
            )}
          </div>
          <div className="grow-0 shrink w-full flex flex-col jutify-center my-2">
            <h2 className="text-xl font-bold ">{booking.place.title}</h2>
            <h3 className="font-medium mb-2">{booking.place.address}</h3>
            <div className='font-medium flex gap-2'>
            <span className='font-bold text-lg'>Your Stay: </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
              {format(new Date(booking.checkIn), 'dd-MM-yyyy')} to <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
              {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
            </div>
            <div className='font-bold text-lg flex gap-2 my-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
              </svg>
              {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} days stay
            </div>
            <div className='font-medium flex gap-2 text-xl my-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <span className='font-bold text-lg'>Total Price: </span>
              ${booking.price}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

