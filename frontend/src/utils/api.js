class Api {
  constructor({url}) {
    this._apiUrl = url;
  }

  getOwnerInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      headers: {
        authorization: this._getToken()
      }
    })
    .then(res => this._checkResponse(res));
  }

  setOwnerInfo(name, about) {
    return fetch(`${this._apiUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })  
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._apiUrl}/cards`, {
      headers: {
        authorization: this._getToken()
      }
    })
    .then(this._checkResponse);
  }

  setCard(name, link) {
    return fetch(`${this._apiUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._apiUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._getToken()
      }
    })
    .then(this._checkResponse);
  }

  setCardLike(id) {
    return fetch(`${this._apiUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._getToken()
      }
    })
    .then(this._checkResponse);
  }

  deleteCardLike(id) {
    return fetch(`${this._apiUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._getToken()
      }
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return this.setCardLike(id);
    } else {
      return this.deleteCardLike(id);
    }
  }

  setAvatar(avatar) {
    return fetch(`${this._apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getToken(){
    return 'Bearer ' + localStorage.getItem('token');
  }
}

const api = new Api({
  url: 'https://api.mesto.elena.nomoredomains.monster'
});

export default api;