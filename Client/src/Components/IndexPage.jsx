import { useEffect, useState } from "react"
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function IndexPage() {
    const [Allplaces, setAllplaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setAllplaces(response.data);
        })        
    }, []);
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  mt-8 gap-x-6 gap-y-8">
            {Allplaces.length > 0 && Allplaces.map(place => (
                <Link to={'/place/'+place._id}>
                    <div className="rounded-2xl flex">
                        {place.photos?.[0] && (
                            <img className="aspect-square rounded-2xl object-cover" src={'http://localhost:4000/' + place.photos?.[0]} alt="image" />
                        )}
                    </div>
                    <div className="px-2 my-2">
                        <h3 className="font-bold text-sm truncate">{place.address}</h3>
                        <h2 className="font-semibold truncate">{place.title}</h2>
                        <div><span className="font-bold">$ {place.priceperday}</span> per day</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}