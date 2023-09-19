import { useEffect, useState } from "react";
import AccountNav from "../AccountSubComponents/AccountNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import Topdetails from "./subdetailscomponenets/Topdetails";

export default function Bookedplace() {
    const { id } = useParams()
    const [booked, setbooked] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get('/booking').then(response => {
                const foundbooking = response.data.find(({ _id }) => _id === id)
                console.log(foundbooking);
                if (foundbooking) {
                    setbooked(foundbooking)
                }
            })
        }
    }, [id])

    if (!booked) { return '' }
    return (
        <div>
            <AccountNav />
            <div>
                <div className="mt-5 rounded-3xl bg-gray-200 px-10 py-6">
                    <Topdetails place={booked.place} />
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-[2fr_1fr] mt-8 mb-4">
                        <div className="py-5">
                            <h2 className="font-bold text-2xl my-5">Description</h2>
                            <p className="font-medium">{booked.place.description}</p>
                            <div className="font-medium flex flex-col my-4">
                                <span>Check-in: {format(new Date(booked.checkIn), 'dd-MM-yyyy')}</span>
                                <span>Check-Out: {format(new Date(booked.checkIn), 'dd-MM-yyyy')}</span>
                                <span>Max Guests: {booked.maxGuests}</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 py-8 px-8 shadow rounded-2xl flex flex-col gap-3 my-8 h-fit w-fit mx-auto">
                            <div className="text-2xl italic font-bold mx-auto underline">
                                Your Booking Information
                            </div>
                            <div className="border border-gray-400 rounded-2xl w-fit mx-auto my-4 bg-gray-50">
                                <div className="">
                                    <div className="py-3 px-4 ">
                                        <div className="font-semibold flex flex-col gap-2">
                                            <span className='font-bold text-lg'>Stay Calendar: </span>
                                            <div className="flex gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                                </svg>
                                                {format(new Date(booked.checkIn), 'dd-MM-yyyy')} to {format(new Date(booked.checkOut), 'dd-MM-yyyy')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-1 px-4 text-center">
                                        <div className='font-bold text-lg flex gap-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                                            </svg>
                                            {differenceInCalendarDays(new Date(booked.checkOut), new Date(booked.checkIn))} days stay
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 px-4 flex gap-4 text-center">
                                    <span className='font-bold text-lg italic'>Guests Staying: </span>
                                    <div className="font-medium text-lg">{booked.maxGuests} </div>
                                </div>
                            </div>
                            <div className="px-8 bg-pink-600 text-white font-bold rounded-lg p-3 w-fit mx-auto">
                                Total Price: <span className="text-lg italic">${booked.price}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-8 lg:grid-cols-[2fr_1fr] my-4">
                        <div>
                            <h2 className="font-bold text-2xl my-5">Extra Info</h2>
                            <p className="font-medium">{booked.place.extraInfo}</p>
                        </div>
                        <div className="mx-auto">
                            <h2 className="font-bold text-2xl my-5">Perks of this booked</h2>
                            <ul className="flex flex-wrap gap-4 uppercase">
                                {booked.place.perks && booked.place.perks.map(perk => (
                                    <li key={perk} className="font-semibold bg-slate-800 shadow-md shadow-slate-600 px-5 py-2 rounded-full text-white">{perk}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
