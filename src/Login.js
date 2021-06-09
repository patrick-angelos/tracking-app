import { Redirect } from 'react-router-dom';
import { useState } from 'react'
import { login } from './logic/sessions';
import { saveToken } from './logic/storage';

const Login = () => {
  const [redirect, setRedirect] = useState();
  const signUp = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.parentElement[0].value;
    const password = e.target.parentElement[1].value;
    const rPassword = e.target.parentElement[2].value;
    if (signUp && password !== rPassword) return
    const response = await login(name, password, 'login');
    if (response.token) {
      saveToken(response.token);
      setRedirect(<Redirect to={{ pathname: '/' }} />);
    } else {
      // display error message
    }
  };

  const validatePassword = signUp ? <input id="rPassword" type="password" placeholder="reapeat password" /> : <div />

  return (
    <>
      {redirect}
      <form>
        <input id="name" type="text" placeholder="username" />
        <input id="password" type="password" placeholder="password" />
        {validatePassword}
        <input type="submit" value="Login" onClick={(e) => handleSubmit(e)} />
      </form>
    </>
  );
};

export default Login;
