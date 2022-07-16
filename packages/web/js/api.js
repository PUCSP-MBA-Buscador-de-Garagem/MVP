const api = {
  createUser: async(formData) => {
    await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  },

  createSession: async(logData) => {
    const responseData = await fetch('http://localhost:3000/session/register',  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logData)
    })

    return responseData.json();
  },

  createProvider: async(providerData) => {
    await fetch('http://localhost:3000/user/provider', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
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
  }
}

export default api;
