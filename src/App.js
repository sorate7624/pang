import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import 'animate.css';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [errorRegister, setErrorRegister] = useState('');
  const [eyeIconVisible, setEyeIconVisible] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setEyeIconVisible(!eyeIconVisible);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/login', {
        id,
        password,
      }, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('response.data: ', response.data);
        console.log('로그인 성공했으니 목록으로 넘어가야 함');
        // 로그인 성공시 다음 로직을 추가합니다.
      })
      .catch((error) => {
        console.error('로그인 실패:', error.message);
        // 로그인 실패시 다음 로직을 추가합니다.
        setErrorLogin(error.message);
      });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/signup', {
        id,
        password,
      }, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('response.data: ', response.data);
        // console.log('로그인 성공했으니 목록으로 넘어가야 함');
        // 회원등록 성공시 다음 로직을 추가합니다.
      })
      .catch((error) => {
        console.error('회원 등록 실패:', error.message);
        // 회원등록 실패시 다음 로직을 추가합니다.
        setErrorRegister(error.message);
      });
  };

  const toggleLoginButton = () => {
    setIsLoginActive((prevIsLoginActive) => !prevIsLoginActive);
    setId('');
    setPassword('');
    setEyeIconVisible(false);
    setErrorLogin('');
    setErrorRegister('');
  };

  return (
    <div className="container">
      <div className="box animate__animated animate__fadeIn">
        {isLoginActive ? (
          <form className="box-login" onSubmit={handleLoginSubmit}>
            <div className="top-header">
              <h3>Hello, Pang</h3>
              <small>We are happy to have you back.</small>
            </div>
            <div className="input-group">
              <div className="input-field">
                <input 
                  type="text"
                  value={id}
                  onChange={handleIdChange}
                  id="loginId"
                  required 
                  className="input-box"
                />
                <label htmlFor="loginId">ID</label>
              </div>
              <div className="input-field">
                <input
                  type={eyeIconVisible ? "text" : "password"}
                  id="loginPassword"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="input-box"
                />
                <label htmlFor="loginPassword">Password</label>
                <div className="eye-area">
                  <div className="eye-box" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={eyeIconVisible ? faEye : faEyeSlash}/>
                  </div>
                </div>
              </div>
              <input type="submit" className="input-submit login" value="Sign In"/>
            </div>
            {errorLogin && (
              <p className="error">
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errorLogin}
              </p>
            )}
          </form>
        ) : (
          <form className="box-register" onSubmit={handleRegisterSubmit}>
            <div className="top-header">
              <h3>Sign Up, Now</h3>
              <small>We are happy to have you with us.</small>
            </div>
            <div className="input-group">
              <div className="input-field">
                <input 
                  type="text"
                  value={id}
                  onChange={handleIdChange}
                  id="registerId"
                  required 
                  className="input-box"
                />
                <label htmlFor="registerId">ID</label>
              </div>
              <div className="input-field">
                <input
                  type={eyeIconVisible ? "text" : "password"}
                  id="registerPassword"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="input-box"
                />
                <label htmlFor="registerPassword">Password</label>
                <div className="eye-area">
                  <div className="eye-box" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={eyeIconVisible ? faEye : faEyeSlash} />
                  </div>
                </div>
              </div>
              <input type="submit" className="input-submit register" value="Sign Up"/>
            </div>
            {errorRegister && (
              <p className="error">
                <FontAwesomeIcon icon={faTriangleExclamation} /> {errorRegister}
              </p>
            )}
          </form>
        )}
        <div className="switch" onClick={toggleLoginButton}>
          <button className={`login ${isLoginActive ? "btn-active" : ""}`}>Login</button>
          <button className={`register ${isLoginActive ? "" : "btn-active"}`}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default App;
