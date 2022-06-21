import api from './api.js';

const btnRegister = document.querySelector('#btnRegister');
const inputRegisterName = document.querySelector('#registerFirstNameField');
const inputRegisterLastName = document.querySelector('#registerLastName');
const inputRegisterEmail = document.querySelector('#registerEmailField');
const inputPasswordField = document.querySelector('#registerPasswordField');
const inputConfirmPasswordField = document.querySelector('#registerConfirmPasswordField');

btnRegister.addEventListener('click', async( event ) => {
  if (inputPasswordField.value !== inputConfirmPasswordField.value && inputPasswordField.value !== '') {
    console.log('Password is different!');
    return;
  }

  const formData = {
    name: inputRegisterName.value,
    lastName: inputRegisterLastName.value,
    email: inputRegisterEmail.value,
    password: inputPasswordField.value
  }

  const response = await api.createUser(formData);
})

