const authURL = 'https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0'

const authorize = async () => {
    const localData = localStorage.getItem('data')
    if (localData) {
      console.log('local token')
      return JSON.parse(localData)
    }

    console.log('not local token')
    const response = await fetch(authURL, { headers: {
      "x-secret-key":"GEU4nvd3rej*jeh.eqp"
    } })
    const data = await response.json()
    localStorage.setItem('data', JSON.stringify(data))
    return data
}

export default authorize