import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {

  const {isAuth, setIsAuth} = useContext(AuthContext);

  const login = event => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
    console.log(localStorage.getItem('auth'));
  }

  return (
    <div>
      <h1>Enter the site</h1>
      <form onSubmit={login}>
        <MyInput type='text' placeholder='Login'/>
        <MyInput type='password' placeholder='Password'/>
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
};

export default Login;