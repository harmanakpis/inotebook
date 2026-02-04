import React from 'react'

const Login = (props) => {
    const {showAlert} = props;
    const handleSubmit = (e)=>{
        e.preventDefault();
        const response = async ()=>{
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const json = await res.json();
            console.log(json);
            if(json.success === true){
                // Save the auth token and redirect
                localStorage.setItem('token', json.token);
                window.location.href = "/";
                showAlert("Logged in successfully", "success");
            }
            else{
                showAlert("Invalid credentials", "danger");
            }
        }
        response();
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" minLength={5} required />
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" minLength={5} required />
        </div>
        
        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default Login
