import React from 'react'
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/navbar';
import {useSelector} from 'react-redux'; 
import { Loader } from 'lucide-react';
import Login from './login';


const Layout = () => {

  const {user, loading} = useSelector(state => state.auth)

  if(loading) {
    return <Loader />
  }
  return (
    <div>
      {
        user ? (<div>
        <DashboardNavbar />
      <Outlet />
    </div>
      ) 
    : <Login/>}
      
    </div>

    
  )
}

export default Layout; 