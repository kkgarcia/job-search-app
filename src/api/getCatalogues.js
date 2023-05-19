import authorize from "./authorize"

const getCatalogues = async () => {
    const appSecretKey = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
    const url = `https://startup-summer-2023-proxy.onrender.com/2.0/catalogues`

    const localData = localStorage.getItem('catalogues')
    if (localData) {
      console.log('local catalogues')
      return JSON.parse(localData)
    }
    console.log('not local catalogues')
    const { access_token } = await authorize()

    const response = await fetch(url, {
      headers: {
        "x-secret-key":"GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": appSecretKey,
        "Authorization":"Bearer " + access_token
      }
    })
    const data = await response.json()
    localStorage.setItem('catalogues', JSON.stringify(data))
    return data
}

export default getCatalogues