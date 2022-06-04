const btnInscrever = document.querySelector('#btnInscrever');
const inputName = document.querySelector('#inputName');
const inputEmail = document.querySelector('#inputEmail');

btnInscrever.addEventListener('click', async( event ) => {
  console.log('Clicou');
  const formData = {
    name: inputName.value,
    email: inputEmail.value,
    password: '123123'
  }

  await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
})

const btnProviderRegister = document.querySelector('#btnProviderRegister');
const inputZipCode = document.querySelector('#validationCustom05');

btnProviderRegister.addEventListener('click', async (event) => {
  console.log('hello');
  await fetch('http://localhost:3000/user/provider', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      width: 2000,
      length: 2000,
      place: {
        zipcode: inputZipCode.value,
        number: 11245
      }
    })
  })
})
