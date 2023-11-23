import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.css'
import api from '../../api/axiosConfig';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/Slice';

function Signup() {

  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState({
    name: "", email: "", password: ""
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleSignup = async (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "" || user.name === "") {
      setShowAlert(true);
      return;
    }

    try {
      const response = await api.post("/api/v1/user/signup", {
        name: user.name,
        username: user.email,
        pass: user.password,
      });

      if (response.status === 200) {
        if (response.data === 'User registered successfully') {
          navigate('/');
          dispatch(login({ name: user.name, isLoggedIn: true, email: user.email }));

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        else if (response.data === 'Username already exists') {
          alert(response.data);
        }

      }


    }
   catch (error) {
    console.error("Axios error:", error);

  }
};


const handleChange = (e) => {
  e.preventDefault();
  setUser((prevState) => {
    return {
      ...prevState,
      [e.target.name]: e.target.value,
    }
  })
  console.log(user);
}

return (
  <div className="auth-container">
    <h2 style={{ color: 'black' }}>Sign Up</h2>
    <form onSubmit={handleSignup}>
      <input
        type="name"
        name="name"
        placeholder="Username"
        value={user.name}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => handleChange(e)}
      />
      <button type="submit" style={{ borderRadius: '11px', margin: '12px' }}>Sign Up</button>
    </form>

    {
      showAlert &&
      (
        <Alert color="danger">
          Wrong Credentials
        </Alert>
      )
    }

  </div>
);
}

export default Signup;