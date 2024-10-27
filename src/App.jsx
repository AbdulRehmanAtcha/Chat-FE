import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import "./index.css"
import Register from './pages/auth/register'
import Chat from './pages/chat'
import Profile from './pages/profile'
import Login from './pages/auth/login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useVerifyMutation } from './services/auth'
import { loginHandler } from './lib/store/slices/auth'

const PrivateRoutes = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const isAuthenticated = !!isLogin;
  return isAuthenticated ? children : <Navigate to="/login" />
}

const AuthRoutes = ({ children }) => {
  const { isLogin, user } = useSelector((state) => state.auth);
  const isAuthenticated = !!isLogin;

  if (isAuthenticated) {
    if (user?.profileSetup === false) {
      return <Navigate to="/profile" />;
    }
    return <Navigate to="/chat" />;
  }
  return children;
}


function App() {

  const { isLogin, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");
  const [verifyToken, { data: userData, isLoading, isError }] = useVerifyMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      verifyToken()
        .unwrap()
        .then((data) => {
          dispatch(loginHandler(data?.data))
        }).catch(() => {
          localStorage.removeItem('token');
        }).finally(() => {
          setLoading(false);

        });
    }
  }, [user, verifyToken, dispatch]);

  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
          element={
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          }
        />
        <Route path='/register'
          element={
            <AuthRoutes>
              <Register />
            </AuthRoutes>
          }
        />
        <Route path='/login'
          element={
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          }
        />
        <Route path='/chat'
          element={
            <PrivateRoutes>
              <Chat />
            </PrivateRoutes>
          }
        />
        <Route path='/profile'
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App