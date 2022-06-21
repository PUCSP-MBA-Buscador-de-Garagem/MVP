import api from './api.js';

const btnLogin = document.querySelector('#SessionAccessButton');
const userEmail = document.querySelector('#sessionEmail');
const userPassword = document.querySelector('#sessionPassword');

btnLogin.addEventListener('click', async(event) => {
  event.preventDefault();

  if (userEmail.value == '' || userPassword.value == '') {
    console.error('Os campos de usuário e senhas precisam estar preenchidos');
    return;
  }

  try {
    const credentials = await api.createSession({ email: userEmail.value, password: userPassword.value });
    localStorage.setItem('loggedUser', JSON.stringify(credentials.user.id));
    localStorage.setItem('token', JSON.stringify(credentials.token));
  } catch (error) {
    console.error(error);
  }
});
