const CONFIG = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNGJlNjU5Yjk4YjAzOGY3NzljZTYiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDYsImV4cCI6MTY5OTQ0Nzk0Nn0.8mXOVSThrHGyOY7e92P0u5EySBUaUeIscnZz01QyJ0Y',
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProductList() {
    return fetch(`${this._baseUrl}/v2/group-7/products`, {
      headers: this._headers,
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/v2/group-7/users/me`, {
      headers: this._headers,
    }).then(onResponse);
  }

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/v2/group-7/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }

  search(searchQuery) {
    return fetch(
      `${this._baseUrl}/v2/group-7/products/search?query=${searchQuery}`,
      {
        headers: this._headers,
      }
    ).then(onResponse);
  }

  changeLikeProduct(productId, isLike) {
    return fetch(`${this._baseUrl}/v2/group-7/products/likes/${productId}`, {
      method: isLike ? 'DELETE' : 'PUT',
      headers: this._headers,
    }).then(onResponse);
  }
}

const api = new Api(CONFIG);

export default api;
