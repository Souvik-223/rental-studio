import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Bookingoperation from "./Bookingoperation";
import Upperdetails from './subdetailscomponenets/Upperdetails'

export default function Placedetails() {
    const { id } = useParams()
    const [place, setplace] = useState(null);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setplace(response.data);
        })
    }, [id])

    if (!place) { return '' }

    return (
        <div>
            <div className="mt-5 rounded-3xl bg-gray-200 px-10 py-6">
                <Upperdetails place={place} />
                <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-[2fr_1fr] mt-8 mb-4">
                    <div className="py-5">
                        <h2 className="font-bold text-2xl my-5">Description</h2>
                        <p className="font-medium">{place.description}</p>
                        <div className="font-medium flex flex-col my-4">
                            <span>Check-in: {place.checkIn}</span>
                            <span>Check-Out: {place.checkOut}</span>
                            <span>Max Guests: {place.maxGuests}</span>
                        </div>
                    </div>
                    <Bookingoperation place={place} />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-8 lg:grid-cols-[2fr_1fr] my-4">
                    <div>
                        <h2 className="font-bold text-2xl my-5">Extra Info</h2>
                        <p className="font-medium">{place.extraInfo}</p>
                    </div>
                    <div  className="mx-auto">
                        <h2 className="font-bold text-2xl my-5">Perks of this place</h2>
                        <ul className="flex flex-wrap gap-4 uppercase">
                            {place.perks && place.perks.map(perk=>(
                                <li key={perk} className="font-semibold bg-slate-800 shadow-md shadow-slate-600 px-5 py-2 rounded-full text-white">{perk}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};
