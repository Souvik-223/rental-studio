import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Layout from './Components/Layout/Layout'
import IndexPage from './Components/IndexPage'
import Signup from './Components/Signup'
import Account from './Components/Account'
import axios from 'axios'
import { UserContextProvider } from './context/usercontext'

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account/:subpage?' element={<Account />} />
          <Route path='/account/:subpage/:action' element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
