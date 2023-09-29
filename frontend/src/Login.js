import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
      const auth =localStorage.getItem("user")
      console.log(auth)
      if(auth){
        navigate("/")
      }
    }, [])
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let result = await fetch('http://localhost:5000/login', {
          method: 'POST',
          body: JSON.stringify({ password, email }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        result = await result.json()
        if (result.auth) {
            localStorage.setItem('user',JSON.stringify(result.user))
            localStorage.setItem('token',JSON.stringify(result.auth))

            navigate("/")
            
        } else {
            alert("incorrect details")
            
        }
      }

    return (
        <div>
            <div className="container">
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lname">Email</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="lname"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="lastname" placeholder="Your last name.." />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lname">Password</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="lname"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="lastname" placeholder="Your last name.." />
                        </div>
                    </div>

                    <div className="row">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login