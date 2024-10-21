import React, { useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux' 

import { ToastContainer, toast } from 'react-toastify';
import { checkAuth } from './Features/AuthSlice/authSlice';
import CheckAuth from './Components/Common/Checkauth';
import LoginForm from './Pages/Auth/Login/Login';
import RegisterForm from './Pages/Auth/Register/Register';
import Auth from './Components/Auth/Auth';
import Student from './Pages/Admin/Student';
import Dashboard from './Pages/Admin/Dashboard';
import Event from './Pages/Admin/Event';
import User from './Pages/Admin/User';
import Admin from './Components/Admin/Admin';
import Socities from './Pages/Admin/Socities';
import Member from './Pages/Admin/Member';



const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.authen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  if (isLoading) return <div>loading....</div>

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
      <ToastContainer
 
/>


  
        <Routes>
          {/* Redirect root to home page */}
          <Route path="/" element={<Navigate to="/shop/home" replace />} />

          {/* Auth Routes */}
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}><Auth/></CheckAuth>}>
            <Route path="login" element={<LoginForm/>} />
            <Route path="register" element={<RegisterForm/>} />
          </Route>
          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}><Admin/></CheckAuth>}>
            <Route path="student" element={<Student/>} />
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="event" element={<Event/>} />
            <Route path="user" element={<User/>} />
            <Route path="socities" element={<Socities/>} />
            <Route path="members" element={<Member/>} />
          </Route>


        

          
        </Routes>
      </div>
    </>
  )
}

export default App
