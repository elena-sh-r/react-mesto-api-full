import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({email, onLogout}) {
  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип" />
      <Switch>
          <Route exact path="/sign-in">
            <Link to='sign-up' className="header__link">Зарегистрироваться</Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to='sign-in' className="header__link">Войти</Link>
          </Route>
          <Route>
            {email && <div><span className="header__email">{email}</span><a href='#' className="header__link header__link_logout" onClick={onLogout}>Выйти</a></div>}
          </Route>
        </Switch>
    </header>
  );
}

export default Header;