import { faAt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log(email, password);

  //   let result = await fetch("http://localhost:8000/login", {
  //     method: "post",
  //     body: JSON.stringify({ email, password }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json();
  //   console.log(result);
  //   console.log("first");

  //   if (result.name) {
  //     localStorage.setItem("user", JSON.stringify(result));
  //     navigate('/main')
  //     // alert("welcome");
  //   } else {
  //     alert("Please enter valid login credentials");
  //   }
  // };

  const navigate = useNavigate();
 
 
 
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    let result = await fetch("http://localhost:8000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    // console.log("first");
    localStorage.setItem("user", JSON.stringify(result));

    localStorage.setItem("jwt",result.token);
    // if(result){
    //   navigate('/main')

    // }
     navigate('/main')

    // if (result) {
    //   localStorage.setItem("user", JSON.stringify(result));
    //   navigate('/main')
    //   // alert("welcome");
    // } else {
    //   alert("Please enter valid login credentials");
    // }
  };
 
 
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-main-page">
        <p>Sign In</p>
        <form action="">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">
              <FontAwesomeIcon icon={faAt} className='fa-regular' />
                
              </span>
            </div>
          </div>

          <div class="input-group mb-3">
            <input
              type={eye ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append bg-transparent">
              <span class="input-group-text" id="basic-addon2">
                <div
                  onClick={() => {
                    setEye(!eye);
                  }}
                >
                  {eye ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </div>
              </span>
            </div>
          </div>
          {/* <div className="login-input">
            <input type="email" required placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login-input login-input-password">
            <div>

            <input className="login-input-eye-left"
              type={eye ? "text" : "password"}
              required
              placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="login-input-eye"
              onClick={() => {
                setEye(!eye);
              }}
              style={{'margin' : '8px'}}
            >
              {eye ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div> */}
          <button
            className="login-input-below-btn"
            type="submit"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </form>
        <button
          className="joinnow-login-button"
          onClick={() => navigate("/register")}
        >
          New to Community? Join now
        </button>
      </div>
      <div className="login-image">
        <img src="Images/l2.jpeg" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
