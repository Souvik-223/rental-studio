import { useEffect, useState } from "react";
import axios from 'axios'
import Perks from "./Perks";
import Uploads from "./Uploads";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function Placeform() {
  const {id} = useParams();
  const [title, settitle] = useState('');
  const [address, setaddress] = useState('');
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [description, setdescription] = useState('');
  const [perks, setperks] = useState([]);
  const [extraInfo, setextraInfo] = useState('');
  const [checkIn, setcheckIn] = useState('');
  const [checkOut, setcheckOut] = useState('');
  const [maxGuests, setmaxGuests] = useState(1);
  const [pricepermonth, setpricepermonth] = useState(1);
  const [priceperday, setpriceperday] = useState(1);
  const [priceperhour, setpriceperhour] = useState(1);

  const [redirect,setredirect] = useState(false);

  useEffect(()=>{
    if (!id) {
      return;
    }
    axios.get('/places/'+ id).then(response=>{
    const {data} = response;
    settitle(data.title);
    setaddress(data.address);
    setaddedPhotos(data.photos);
    setdescription(data.description);
    setperks(data.perks);
    setextraInfo(data.extraInfo);
    setcheckIn(data.checkIn);
    setcheckOut(data.checkOut);
    setmaxGuests(data.maxGuests);
    setpriceperday(data.priceperday)
    setpricepermonth(data.pricepermonth)
    setpriceperhour(data.priceperhour)

    });
  },[id])
  function headeranddescription(header, description) {
    return (
      <div>
        <h2 className="text-lg font-semibold mt-5">{header}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    )
  }

  async function savePlace(event) {
    event.preventDefault();
    const PlaceData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, pricepermonth, priceperday,priceperhour}
    if (id) {
      //update an exisiting place to the database
      await axios.put('/places', {id, ...PlaceData})
      setredirect(true)

    } else {
      // add a new place to database
      await axios.post('/places', PlaceData)
      setredirect(true)
    }

  }

if (redirect) {
  return <Navigate to={'/account/places'}/>
}

  return (
    <>
      <AccountNav />
      <div>
        <form className="flex flex-col" onSubmit={savePlace}>
          {headeranddescription('Title', 'The title for your property')}
          <input value={title} onChange={ev => settitle(ev.target.value)} className="border-2 border-gray-400 px-5 py-1 rounded-xl" type="text" placeholder="Title for your lovely apartment" />
          {headeranddescription('Address', 'Address should contain the city and street')}
          <input value={address} onChange={ev => setaddress(ev.target.value)} className="border-2 border-gray-400 px-5 py-1 rounded-2xl h-20" type="text" placeholder="Address" />
          {headeranddescription('Photos', 'Add beautiful imgaes for your place')}
          <Uploads addedPhotos={addedPhotos} onChange={setaddedPhotos} />

          {headeranddescription('Description', 'Add a meaningful description to your place')}
          <textarea value={description} onChange={ev => setdescription(ev.target.value)} className="border border-gray-400 rounded-2xl py-2 px-3 h-36" />

          {/* perks section */}
          {headeranddescription('Perks', 'Add all perks for your place')}
          <Perks selected={perks} onChange={setperks} />

          {headeranddescription('Extra Info', 'House rules etc.')}
          <textarea value={extraInfo} onChange={ev => setextraInfo(ev.target.value)} className="border border-gray-400 rounded-2xl py-2 px-3" />

          {headeranddescription('Check-in / Check-out time & Max Guests', 'Make sure to provide accurate timings')}
          <div className="grid gap-2 sm:grid-cols-3 my-4 text-center">
            <div>
              <h3 className="mt-2">Check in time</h3>
              <input value={checkIn} onChange={ev => setcheckIn(ev.target.value)} className="border border-gray-400 rounded-2xl text-center py-2 px-3" type="text" placeholder="14:00" />
            </div>
            <div>
              <h3 className="mt-2">Check out time</h3>
              <input value={checkOut} onChange={ev => setcheckOut(ev.target.value)} className="border border-gray-400 rounded-2xl text-center py-2 px-3" type="text" placeholder="14:00" />
            </div>
            <div>
              <h3 className="mt-2">Max number of guests</h3>
              <input value={maxGuests} onChange={ev => setmaxGuests(ev.target.value)} className="border border-gray-400 rounded-2xl text-center py-2 px-3" type="number" placeholder="14:00" />
            </div>
          </div>
          {headeranddescription('Price','Make Sure to give a good Price')}
          <div className="grid gap-2 sm:grid-cols-3 my-4 text-center">
            <div>
              <h3 className="mt-2">Price / Per-Month</h3>
              <input value={pricepermonth} onChange={ev => setpricepermonth(ev.target.value)} className="border border-gray-400 rounded-2xl text-center py-2 px-3" type="number" placeholder="14:00" />
            </div>
            <div>
              <h3 className="mt-2">Price / Per-Day</h3>
              <input value={priceperday} onChange={ev => setpriceperday(ev.target.value)} className="border border-gray-400 rounded-2xl text-center py-2 px-3" type="number" placeholder="14:00" />
            </div>
            <div>
              <h3 className="mt-2">Price / Per-Hour</h3>
              <input value={priceperhour} onChange={ev => setpriceperhour(ev.target.value)} className="border border-gray-400 rounded-2xl text-center py-2 px-3" type="number" placeholder="14:00" />
            </div>
          </div>
          <button className="bg-[#ff385c] text-white font-bold text-xl px-8 py-3 rounded-full w-[70vw] mx-auto my-8">Save</button>
        </form>
      </div>
    </>
  )
};
