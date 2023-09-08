import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Layout from './Components/Layout'
import IndexPage from './Components/IndexPage'
import Signup from './Components/Signup'
import axios from 'axios'

axios.defaults.baseURL='http://127.0.0.1:4000';
axios.defaults.withCredentials= true ;

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Route>
    </Routes>
  )
}

export default App
