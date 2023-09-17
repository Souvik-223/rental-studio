import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";

export default function Placesforsale() {
  const [places, setplaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setplaces(data)
    })
  }, [])

  return (
    <div>
      <AccountNav />
      <div className="w-full flex flex-col justify-center items-center  mt-8 gap-6 mb-8">
        <div className="bg-[#ff385c] text-white py-2 px-6 font-semibold rounded-full">
          <Link className="flex gap-2" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Add Your Place
          </Link>
        </div>
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/' + place._id} className="flex gap-4 p-4 bg-gray-200 rounded-2xl">
            <div className="bg-gray-400 h-32 w-32 grow shrink-0">
              {place.photos.length > 0 && (
                <img src={place.photos[0]} alt="image" />
              )}
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-lg font-semibold ">{place.title}</h2>
              <p>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}