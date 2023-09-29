import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault();

    let result = await  fetch('http://localhost:5000/signup', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, email }),
    })

    result = await result.json()
    console.log(result,"result")
    localStorage.setItem("user",JSON.stringify(result.result))
    localStorage.setItem("token",JSON.stringify(result.auth))
    navigate('/')

  }

  return (
    <div className="container">
      <h1>SignUp Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label for="fname">Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="firstname" placeholder="Your name.." />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="lname">Email</label>
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
            <label for="lname">Password</label>
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
  )
}

export default Signup