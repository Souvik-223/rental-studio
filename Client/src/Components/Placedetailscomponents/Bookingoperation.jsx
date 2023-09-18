import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import {Navigate} from 'react-router-dom'
import { UserContext } from "../../context/usercontext"
import axios from "axios"

export default function Bookingoperation({ place }) {
    const [checkIn, setcheckIn] = useState('')
    const [checkOut, setcheckOut] = useState('')
    const [maxGuests, setmaxGuests] = useState(1)
    const [name, setname] = useState('')
    const [mobilenumber, setmobilenumber] = useState(null)
    const [redirect, setredirect] = useState('')
    const {User} = useContext(UserContext)

    useEffect(()=>{
        if(User){
            setname(User.name)
        }
    },[User])

    let numberofdays = 0;
    if (checkIn && checkOut) {
        numberofdays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookingPlace() {
        const bookingData = { place: place._id, checkIn, checkOut, maxGuests, name, mobilenumber, price: place.priceperday * numberofdays }
        const response = await axios.post('/booking', bookingData);
        const bookingId = response.data._id
        setredirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div className="bg-white py-4 px-8 shadow rounded-2xl flex flex-col gap-3 my-5 h-fit w-fit mx-auto">
            <div className="text-2xl font-medium mx-auto">
                Price: ${place.priceperday} / per day
            </div>
            <div className="border border-gray-400 rounded-2xl w-fit mx-auto my-4 bg-gray-50">
                <div className="flex gap-4 text-center">
                    <div className="py-3 px-4 ">
                        <label className="font-semibold">Check In: </label>
                        <input className="rounded-full px-4" type="date" value={checkIn} onChange={ev => setcheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 text-center">
                        <label className="font-semibold">Check Out: </label>
                        <input className="rounded-full px-4" type="date" value={checkOut} onChange={ev => setcheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 flex gap-4 text-center">
                    <label className="font-semibold">No. of Guests: </label>
                    <input className="rounded-full px-4 border border-gray-400 py-1" type="number" value={maxGuests} onChange={ev => setmaxGuests(ev.target.value)} />
                </div>
                {numberofdays > 0 && (
                    <div>
                        <div className="py-3 px-4 flex flex-col gap-4">
                            <label className="font-semibold">Your Full name: </label>
                            <input className="rounded-full px-4 border border-gray-400 py-1" type="text" value={name} onChange={ev => setname(ev.target.value)} />

                            <label className="font-semibold">Your Mobile number: </label>
                            <input className="rounded-full px-4 border border-gray-400 py-1" type="tel" placeholder="+91 9999999999" value={mobilenumber} onChange={ev => setmobilenumber(ev.target.value)} />
                        </div>
                        <div className="text-lg text-center font-bold my-3">Your Total Price : {place.priceperday * numberofdays}</div>
                    </div>
                )}
            </div>
            <button onClick={bookingPlace} className="px-8 bg-pink-600 text-white font-bold rounded-full py-2 max-w-full">
                Book this place for {numberofdays > 0 && (
                    <span>{numberofdays} {numberofdays > 1 ? "days" : "day"}</span>
                )}
            </button>
        </div>
    )
};
