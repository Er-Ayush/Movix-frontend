import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.css'
import api from '../../api/axiosConfig';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/Slice';

function Login() {

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    email: "", password: ""
  })

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (user.email == "" || user.password == "") {
      setShowAlert(true);
      return;
    }

    try {
      const response = await api.post("/api/v1/user/login", {
        username: user.email,
        pass: user.password,
      });
      console.log(response.data);
      console.log(response.status);
      if (response.data && response.status === 200) {

        dispatch(login({ name: response.data, isLoggedIn: true, email: user.email }));
        
        setTimeout(() => {
          navigate("/");
        }, 1000);

      }
      
    } catch (error) {
      alert('Bad Creds');
      console.log(error);
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
      <h2 style={{ color: 'black' }}>Log In</h2>
      <form onSubmit={handleLogin}>

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
        <button type="submit" style={{ borderRadius: '11px', margin: '12px' }}>Log In</button>
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

export default Login;