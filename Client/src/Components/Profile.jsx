import AccountNav from './AccountSubComponents/AccountNav'
import { useState, useContext } from "react";
import { UserContext } from "../context/usercontext";
import { Navigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function Profile() {
    const { User, setUser, ready } = useContext(UserContext)
    const [redirect, setredirect] = useState(null)

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }

    async function logout() {
        await axios.post('/logout');
        setredirect('/');
        setUser(null);
    }

    if (!ready) {
        return "Loading..."
    }

    if (ready && !User && !redirect) {
        return <Navigate to={"/login"} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
            <AccountNav />
            <div className="text-center mx-auto max-w-lg mt-14">
                <p className="font-bold text-lg">Logged in as {User ? User.name : ""} with {User ? User.email : ""}</p>
                <br />
                <button onClick={logout} className="w-full py-2 px-6 font-semibold rounded-full bg-[#ff385c] text-white max-w-md">Logout</button>
            </div>

        </>
    )
}