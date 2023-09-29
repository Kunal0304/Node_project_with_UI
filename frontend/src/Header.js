import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()
  var auth = localStorage.getItem("user")

  
  const logout=()=>{
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div>
            <div class="topnav">                
            {auth ? <> <Link to="/">Home</Link>
                <Link to="/addproduct">AddProduct</Link>
                <Link to="/productlist">Products</Link>
                <Link to="/login" onClick={logout}>LogOut({JSON.parse(auth).name})</Link></>:
               <> <Link to="/signup">SignUp</Link>
                  <Link to="/login">LogIn</Link></>}
            </div>
    </div>
  )
}

export default Header