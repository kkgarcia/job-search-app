import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsFilterLeft } from 'react-icons/bs'
import { searchVacancy } from '../api/search'
import { useStateContext } from '../hooks/useStateContext'

import PagintedItems from '../components/VacancyList'
import FilterTab from '../components/FilterTab'

const Home = () => {
    const [searchInputValue, setSearchInputValue] = useState('')
    const [selectValue, setSelectValue] = useState(null)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [searchMode, setSearchMode] = useState(false)
    const [isFilterOpened, setIsFilterOpened] = useState(false)
    const { setVacancyList, catalogues } = useStateContext()

    const catalogues_data = catalogues.map(cat => {
        return {
            value: cat.key,
            label: cat.title_trimmed
        }
    })
    
    const params = {
        keyword: searchInputValue,
        catalogues: selectValue,
        payment_from: from,
        payment_to: to,
    }
    
    
    
    useEffect(() => {
        
        if (searchMode) {
            const fetchdata = async () => {
                const res = await searchVacancy(params)
                console.log(res)
                setVacancyList(res.objects)
            }
            // console.log('fetching')
            fetchdata()
            setSearchMode(false)
        }
        
        // console.log('not fetching')
    }, [searchMode])

    const resetFilterFields = () => {
        setSelectValue(null)
        setFrom('')
        setTo('')
    }
    
    const handleOnClick = (e) => {
        e.preventDefault()
        console.log('search')
        setSearchMode(true)
    }
    
    const toggleFilter = () => {
        setIsFilterOpened(prev => !prev)
    }
    
    
    const handleSearchInput = (e) => {
        e.preventDefault()
        setSearchInputValue(e.target.value)
    }

    //values for props
    const values = {
        selectValue,
        catalogues_data,
        from,
        to,
        resetFilterFields,
        setSelectValue,
        setFrom,
        setTo,
        handleOnClick
    }

    return (
        <main className="main-wrapper container">
            <div className="filter-tab">
                <FilterTab
                    values={values}
                />
            </div>

            <div className="main-content" >
                <div className="search-bar">
                    <FiSearch size={25} color='grey'/>
                    <form>
                        <input 
                            value={searchInputValue}
                            onChange={handleSearchInput}
                            data-elem='search-input'
                            type="search" 
                            placeholder="Введите название вакансии"
                            required

                        />
                        <button
                            data-elem='search-button'
                            className='search-btn'
                            onClick={(e) => handleOnClick(e)}
                        >Поиск</button>
                    </form>

                </div>
                    {/* for smaller devices */}
                    <button 
                        onClick={toggleFilter}
                        className='toggle-filter-btn'
                    >
                    <BsFilterLeft size={20} />
                    Фильтр
                    </button>
                    <div className={`filter-tab-sm ${isFilterOpened && 'filter-opened'}`}>
                        <FilterTab
                            values={values}
                        />
                    </div>
            
                <PagintedItems itemsPerPage={4} onlyStarred={false} />
            </div>
        </main>
    )
}

export default Home