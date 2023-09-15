export default function Profile({User,logout}) {
    return (
        <div className="text-center mx-auto max-w-lg mt-14">
            <p className="font-bold text-lg">Logged in as {User ? User.name : ""} with {User ? User.email : ""}</p>
            <br />
            <button onClick={logout} className="w-full py-2 px-6 font-semibold rounded-full bg-[#ff385c] text-white max-w-md">Logout</button>
        </div>
    )
}