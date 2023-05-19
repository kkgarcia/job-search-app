import { useEffect, useState, createContext } from 'react'
import getVacancies from '../api/getVacancies'
import getCatalogues from '../api/getCatalogues'

export const Context = createContext()

export const StateContext = ({ children }) => {
    const [vacancyList, setVacancyList] = useState([])
    const [starredVacanciesID, setStarredVacanciesID] = useState([])
    const [catalogues, setCatalogues] = useState([])

    useEffect(() => {
        const local = localStorage.getItem('starred') || '[]'
        const idList = JSON.parse(local)

        if (idList.length) {
            setStarredVacanciesID(idList)
        }

        const getData = async () => {
            try {
                const data = await getVacancies()
                // console.log('fetched data :', data)
                const catalogues = await getCatalogues()

                if (!Array.isArray(catalogues) && !Array.isArray(data)) {
                    throw catalogues
                }

                setCatalogues(catalogues)
                setVacancyList(data?.objects)
                
            } catch (error) {
                console.log('Error: ' + error?.error?.message || error)
            }
        }
        getData()
    },[])

    useEffect(() => {
        localStorage.setItem('starred', JSON.stringify(starredVacanciesID))
    },[starredVacanciesID])
    
    return (
        <Context.Provider value={{
            vacancyList,
            catalogues,
            starredVacanciesID,
            setVacancyList,
            setStarredVacanciesID
        }}>
            {children}
        </Context.Provider>
    )
}