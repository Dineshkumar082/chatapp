import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <span className="logo">ChatApp</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt=""/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>{
          navigate('/login')
          signOut(auth)
          }}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar