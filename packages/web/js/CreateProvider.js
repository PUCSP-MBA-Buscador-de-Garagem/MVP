const btnProviderRegister = document.querySelector('#btnProviderRegister');
const inputZipCode = document.querySelector('#validationCustom05');

btnProviderRegister.addEventListener('click', async (event) => {
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

