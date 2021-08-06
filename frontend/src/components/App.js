import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import CardList from './CardList';
import api from '../utils/api';
import auth from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';  
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [infoTooltipState, setInfoTooltipState] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    checkUser({token: localStorage.getItem('token')});

    api.getOwnerInfo()
    .then((res) => {
      setCurrentUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function processRegister({email, password}) {
    auth.signUp({email, password})
    .then((res) => {
      setInfoTooltipState({success: true, text: 'Вы успешно зарегистрировались!'});

      history.push('/sign-in');
    })
    .catch((statusCode) => {
      setInfoTooltipState({success: false, text: `${statusCode === 400 ? 'Некорректно заполнено одно из полей!' : 'Что-то пошло не так!'} Попробуйте ещё раз.`});
    });
  }

  function processLogin({email, password}) {
    auth.signIn({email, password})
    .then((res) => {
      localStorage.setItem('token', res.token); 
      setLoggedIn(true);
      setEmail(email);

      history.push('/cards');
    })
    .catch((statusCode) => {
      setInfoTooltipState({success: false, text: `${statusCode === 400 ? 'Не передано одно из полей!' : statusCode === 401 ? 'Пользователь с email не найден!' : 'Что-то пошло не так!'} Попробуйте ещё раз.`});
    });
  }

  function checkUser({token}) {
    if (!token) {
      return;
    }

    auth.checkUser({token})
    .then((res) => {
      setLoggedIn(true);
      setEmail(res.data.email);

      history.push('/cards');
    })
    .catch((statusCode) => {
      logout();
    });
  }

  function logout() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
  }

  function closeInfoTooltip() {
    setInfoTooltipState(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onLogout={logout}/>
        <Switch>
          <ProtectedRoute
            exact path="/cards"
            loggedIn={loggedIn}
            component={CardList}
            setCurrentUser={setCurrentUser}
          />
          <Route exact path="/sign-in">
            {loggedIn ? <Redirect to="/cards" /> : <Login onLogin={processLogin}/>}
          </Route>
          <Route exact path="/sign-up">
            {loggedIn ? <Redirect to="/cards" /> : <Register onRegister={processRegister}/>}
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <InfoTooltip infoTooltipState={infoTooltipState} onClose={closeInfoTooltip}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
