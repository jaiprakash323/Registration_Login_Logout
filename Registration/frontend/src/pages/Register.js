import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register(){
    const [form, setForm] = useState({ username: "", email: "", password: ""});

    const handleRegister = async () => {
        await axios.post("http://127.0.0.1:8000/api/register/", form);
        alert("Registered!");
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <div className="Filinput">
                <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
                <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
                <input placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <button onClick={handleRegister} >Register</button>
            <p>Already have an account?{" "}
            <Link to="/">Login here</Link>
      </p>
        </div>
    )
}

export default Register;