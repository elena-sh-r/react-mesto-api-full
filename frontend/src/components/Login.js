import React, { useState } from 'react';
import AuthForm from './AuthForm';

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({email, password});
  }

  return (
    <AuthForm title="Вход" name="login" buttonText={"Войти"} onSubmit={handleSubmit} children={
      <>
        <label className="auth-form__field">
          <input className="auth-form__input auth-form__input_type_name" name="name" type="text" id="email-input" minLength="2" maxLength="40" placeholder="Email" value={email || ''} onChange={(e) => setEmail(e.target.value)} required/>
          <span className="name-input-error auth-form__input-error auth-form__input-error_type_name"></span>
        </label>
        <label className="auth-form__field">
          <input className="auth-form__input auth-form__input_type_about" name="about" type="password" id="password-input" minLength="2" maxLength="200" placeholder="Пароль" value={password || ''} onChange={(e) => setPassword(e.target.value)} required/>
          <span className="about-input-error auth-form__input-error auth-form__input-error_type_about"></span>
        </label>
      </>
    }/>
  );
}

export default Login;