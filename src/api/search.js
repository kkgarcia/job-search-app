import authorize from "./authorize"

const appSecretKey = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'

export const searchVacancy = async (params) => {
    const { keyword, payment_from, payment_to, catalogues } = params 
    const { access_token } = await authorize()
    
    const url = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=1&${keyword ? 'keyword=' + keyword + '&' : ''}${payment_from ? 'payment_from=' + payment_from + '&' : ''}${payment_to ? 'payment_to=' + payment_to + '&' : ''}${catalogues ? 'catalogues=' + catalogues: ''}`

    console.log(url)
    const res = await fetch(url, {
      headers: {
        "x-secret-key":"GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": appSecretKey,
        "Authorization":"Bearer " + access_token
      }
    })
    const data = await res.json()
    return data
}

// no permission
export const searchById = async () => {
    const { access_token } = await authorize()
    
    const url = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?ids=[34327212]`

    const res = await fetch(url, {
      headers: {
        "x-secret-key":"GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": appSecretKey,
        "Authorization":"Bearer " + access_token
      }
    })
    const data = await res.json()
    return data
}
