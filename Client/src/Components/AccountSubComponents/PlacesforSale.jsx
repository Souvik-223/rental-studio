import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Addplaceformcomponent/Perks";
import axios from 'axios'

export default function Placesforsale({ User, logout }) {
  const { action } = useParams();
  const [title, settitle] = useState('');
  const [address, setaddress] = useState('');
  const [photoLink, setphotoLink] = useState('');
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [description, setdescription] = useState('');
  const [perks, setperks] = useState([]);
  const [extraInfo, setextraInfo] = useState('');
  const [checkIn, setcheckIn] = useState('');
  const [checkOut, setcheckOut] = useState('');
  const [maxGuests, setmaxGuests] = useState(1);

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {Link:photoLink})
    setaddedPhotos(prev => {
      return [...prev, filename]
    })
    setphotoLink('')
  }

  function uploadPhoto(ev){
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos',files[i])
    }
    axios.post('/upload',data,{
      header:{'Content-type':'multipart/form-data'}
    }).then(response =>{
      const {data:filename} = response;
      setaddedPhotos(prev => {
        return [...prev, filename]
      })
    });
  }

  function headeranddescription(header, description) {
    return (
      <div>
        <h2 className="text-lg font-semibold mt-5">{header}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    )
  }

  return (
    <div>
      {action !== 'new' && (
        <div className="w-full flex justify-center mt-8 gap-6 mb-8">
          <div className="bg-[#ff385c] text-white py-2 px-6 font-semibold rounded-full">
            <Link className="flex gap-2" to={'/account/places/new'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
              Add Your Place
            </Link>
          </div>
        </div>
      )}

      {
        action === 'new' && (
          <div className="mx-10">
            <form className="flex flex-col">
              {headeranddescription('Title', 'The title for your property')}
              <input value={title} onChange={ev => settitle(ev.target.value)} className="border-2 border-gray-400 px-5 py-1 rounded-xl" type="text" placeholder="Title for your lovely apartment" />
              {headeranddescription('Address', 'Address should contain the city and street')}
              <input value={address} onChange={ev => setaddress(ev.target.value)}  className="border-2 border-gray-400 px-5 py-1 rounded-2xl h-20" type="text" placeholder="Address" />
              {headeranddescription('Photos', 'Add beautiful imgaes for your place')}
              <div className="flex justify-between gap-4">
                <input value={photoLink}  onChange={ev => setphotoLink(ev.target.value)} className='w-full px-10 rounded-2xl border border-gray-400' type="text" placeholder="Add using link.....jpg" />
                <button className="bg-[#ff385c] text-white px-6 py-2 rounded-full" onClick={addPhotoByLink}>Add&nbsp;Photo</button>
              </div>
              <div className="mt-2 grid gap-4 grid-cols-3 md:grid-cols-4 lg:gird-cols-6">
                {addedPhotos.length>0 && addedPhotos.map(link => (
                  <div>
                    <img className="rounded-xl" src={'http://localhost:4000/uploads/'+link} alt="image"/>
                  </div>
                ))}
                <label className="flex cursor-pointer justify-center items-center gap-2 border border-gray-400 text-xl bg-transparent rounded-2xl text-gray-600 h-44">
                  <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  Upload
                </label>
              </div>
              {headeranddescription('Description', 'Add a meaningful description to your place')}
              <textarea value={description} onChange={ev => setdescription(ev.target.value)} className="border border-gray-400 rounded-2xl py-2 px-3 h-36" />

              {/* perks section */}
              {headeranddescription('Perks', 'Add all perks for your place')}
              <Perks perks={perks} setperks={setperks}/>


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
              <button className="bg-[#ff385c] text-white font-bold text-xl px-8 py-3 rounded-full w-[70vw] mx-auto my-8">Save</button>
            </form>
          </div>
        )
      }
    </div>
  )
}
