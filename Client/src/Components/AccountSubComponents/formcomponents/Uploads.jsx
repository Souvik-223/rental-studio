import { useState } from "react";
import axios from 'axios'

export default function Uploads({addedPhotos, onChange}){
    const [photoLink, setphotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', {Link:photoLink})
        onChange(prev => {
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
          const {data:filenames} = response;
          onChange(prev => {
            return [...prev, ...filenames]
          })
        });
      }

    return (
        <>
            <div className="flex justify-between gap-4">
                <input value={photoLink} onChange={ev => setphotoLink(ev.target.value)} className='w-full px-10 rounded-2xl border border-gray-400' type="text" placeholder="Add using link.....jpg" />
                <button className="bg-[#ff385c] text-white px-6 py-2 rounded-full" onClick={addPhotoByLink}>Add&nbsp;Photo</button>
            </div>
            <div className="mt-2 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex" key={link}>
                        <img className="rounded-xl w-full object-cover" src={'http://localhost:4000/' + link} alt="image" />
                    </div>
                ))}
                <label className="h-32 flex cursor-pointer justify-center items-center gap-2 border border-gray-400 text-xl bg-transparent rounded-2xl text-gray-600">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
};
