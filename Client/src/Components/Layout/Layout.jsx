import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Toaster } from "react-hot-toast";
export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen mx-6 sm:mx-8 md:mx-10 xl:mx-12 2xl:mx-16">
            <Toaster 
            position="top-center"
            toastOptions={{
                style: {
                  background: '#1d1f1e',
                  color: '#ffffff'
                }
                }}/>
            <Header />
            <Outlet />
        </div>
    )
}