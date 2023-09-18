import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Perks from "../AccountSubComponents/formcomponents/Perks";
import Bookingoperation from "./Bookingoperation";

export default function Placedetails() {
    const { id } = useParams()
    const [place, setplace] = useState(null);
    const [showallphotos, setshowallphotos] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setplace(response.data);
        })
    }, [id])

    if (!place) { return '' }

    if (showallphotos) {
        return (
            <div className="absolute inset-0 bg-black min-h-screen text-white">
                <div className="p-8 grid gap-4 bg-black justify-center items-center">
                    <div className="font-bold">
                        <h1 className="text-2xl">Photos of {place.title}</h1>
                        <button onClick={() => setshowallphotos(false)} className="flex fixed gap-2 px-3 py-2 rounded-full bg-white text-black right-12">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Images
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className="mx-auto">
                            <img className="w-[60vw] h-[60vh] object-cover" src={"http://localhost:4000/" + photo} alt="imageList" />
                        </div>
                    ))}
                </div>

            </div>
        )
    }
    return (
        <div>
            <div className="mt-5 rounded-3xl bg-gray-300 px-10 py-6">
                <div className="mb-3">
                    <h1 className="text-2xl font-bold mb-1">{place.title}</h1>
                    <a target="_blank" href={"https://maps.google.com/?q=" + place.address} className="text-sm flex gap-2 underline font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {place.address}
                    </a>
                </div>
                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl max-h-[50rem] overflow-hidden">
                        <div>
                            {place.photos?.[0] && (
                                <img className="max-h-[50rem] aspect-square object-cover" src={"http://localhost:4000/" + place.photos[0]} alt="image 1" />
                            )}
                        </div>
                        <div className="grid">
                            {place.photos?.[1] && (
                                <img className="max-h-[30rem] aspect-square object-cover" src={"http://localhost:4000/" + place.photos[1]} alt="image 2" />
                            )}
                            <div className="overflow-hidden">
                                {place.photos?.[2] && (
                                    <img className="max-h-[30rem] aspect-square object-cover relative top-2" src={"http://localhost:4000/" + place.photos[2]} alt="image 3" />
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setshowallphotos(true)} className="flex gap-2 absolute bottom-2 right-2 bg-gray-200 rounded-2xl px-4 py-2 shadow-md font-semibold text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                        </svg>
                        Show More Photos
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-8 sm:grid-cols-[2fr_1fr] my-8">
                    <div className="py-5">
                        <h2 className="font-bold text-2xl my-5">Description</h2>
                        <p className="font-medium">{place.description}</p>
                        <div className="font-medium flex flex-col my-4">
                            <span>Check-in: {place.checkIn}</span>
                            <span>Check-Out: {place.checkOut}</span>
                            <span>Max Guests: {place.maxGuests}</span>
                        </div>
                    </div>
                    <Bookingoperation place={place}/>
                </div>
                <div>
                    <h2 className="font-bold text-2xl my-5">Extra Info</h2>
                    <p className="font-medium">{place.extraInfo}</p>
                </div>
                <div>
                    <h2 className="font-bold text-2xl my-5">Perks for this place</h2>
                    
                </div>
            </div>

        </div>
    )
};
