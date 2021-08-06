class Auth {
  constructor({url}) {
    this._apiUrl = url;
  }

  signUp({email, password}) {
    return fetch(`${this._apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(this._checkResponse);
  }

  signIn({email, password}) {
    return fetch(`${this._apiUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(this._checkResponse);
  }

  checkUser({token}) {
    return fetch(`${this._apiUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}

const auth = new Auth({
  //url: 'http://api.mesto.elena.nomoredomains.monster'
  url: 'http://localhost:3000'
});

export default auth;