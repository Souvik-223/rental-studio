import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Layout from './Components/Layout/Layout'
import IndexPage from './Components/IndexPage'
import Signup from './Components/Signup'
import axios from 'axios'
import { UserContextProvider } from './context/usercontext'
import Bookings from './Components/AccountSubComponents/Bookings'
import Profile from './Components/Profile'
import Sellproperty from './Components/AccountSubComponents/Sellproperty'
import Placeform from './Components/AccountSubComponents/formcomponents/Placeform'
import Placedetails from './Components/Placedetailscomponents/Placedetails'
import Bookedplace from './Components/Placedetailscomponents/Bookedplace'

axios.defaults.baseURL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Profile />} />
          <Route path='/account/places' element={<Sellproperty/>} />
          <Route path='/account/bookings' element={<Bookings />} />
          <Route path='/account/bookings/:id' element={<Bookedplace/>} />
          <Route path='/account/places/new' element={<Placeform/>} />
          <Route path='/account/places/:id' element={<Placeform/>} />
          <Route path='/place/:id' element={<Placedetails/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
