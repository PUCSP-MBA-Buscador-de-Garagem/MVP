import api from './api.js';

const btnLogout = document.querySelector('#btnLogoutSession');


btnLogout.addEventListener('click', async(event) => {
  event.preventDefault();

  try {

    if (localStorage.getItem('loggedUser')) {
      localStorage.setItem('loggedUser', '')
    }

    if (localStorage.getItem('token')) {
      localStorage.setItem('token', '')
    }

    window.location = "/packages/web/index.html"

  } catch (error) {
    console.error(error);
  }
});
