import authorize from './authorize'

const appSecretKey = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'

const vacURL = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies'

const getVacancies = async () => {
    const { access_token } = await authorize()
    console.log('fetch vacancies.....')
    const res = await fetch(vacURL, {
      headers: {
        "x-secret-key":"GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": appSecretKey,
        "Authorization":"Bearer " + access_token
      }
    })
    const data = await res.json()
    return data
}

export default getVacancies