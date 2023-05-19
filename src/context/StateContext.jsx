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
            const data = await getVacancies()
            const catalogues = await getCatalogues()
            console.log('catalogues:  ',catalogues)
            // console.log(data?.objects)
            setCatalogues(catalogues)
            setVacancyList(data?.objects)
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