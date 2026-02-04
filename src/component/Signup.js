import React from 'react'

const Signup = (props) => {
    const {showAlert} = props;
    const onChange = (e)=>{ 
      console.log(e.target.value);
    }   
     const handleSubmit = (e)=>{
        e.preventDefault();
        const response = async ()=>{
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const res = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {  
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password, confirmPassword})  
            });
            const json = await res.json();
            console.log(json);
            if(json.success === true){
                // Save the auth token and redirect
                localStorage.setItem('token', json.token);
                window.location.href = "/";
                showAlert("Account created successfully", "success");
            }
            else{
                showAlert("Invalid details", "danger");
            }

        }
        response();

    }
  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" required  onChange={onChange}/>
        </div>  
        <div className="mb-3">  
            <label for="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required  onChange={onChange}  />
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" required minLength={5} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label for="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" minLength={5} required onChange={onChange} />
        </div>  
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
