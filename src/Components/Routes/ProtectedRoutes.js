import React from 'react'
import { getuser } from '../../services/userService'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
	// return getuser() ? <Outlet /> : <Navigate to="/login" />
	
	}

export default ProtectedRoutes
