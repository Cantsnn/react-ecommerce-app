import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ admin, children }) {
  const { loggedIn, user } = useAuth()
  // return loggedIn
  //   ? ((admin && user.role !== 'admin')
  //     ? <Navigate to={'/'} />
  //     : children)
  //   : <Navigate to={'/'} />

 if (loggedIn) {
  if (admin && user.role !== "admin") {
    return  <Navigate  to={'/profile'} />
  }
  return children
  
 } else {
  return  <Navigate to={'/signin'} />
 }
}

export default ProtectedRoute