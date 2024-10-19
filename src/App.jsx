import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import "./index.css"
import { Button } from '@/components/ui/button'
import Register from './pages/auth/register'
import Chat from './pages/chat'
import Profile from './pages/profile'
import Login from './pages/auth/login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to={"/login"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
