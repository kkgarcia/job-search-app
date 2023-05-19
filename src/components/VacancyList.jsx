import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useStateContext } from '../hooks/useStateContext'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import uniqid from 'uniqid'

import Vacancy from './Vacancy'


const Vacancies = ({ currentItems }) => {

    return (
        <>
        {currentItems && currentItems.map(item => {
          return (
            <Vacancy key={uniqid()} value={item} />
          )
        })}
        </>
    )
}

function PaginatedItems({ itemsPerPage, onlyStarred }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const navigate = useNavigate()

    const { vacancyList, starredVacanciesID } = useStateContext()
    
    let list = vacancyList ? vacancyList : []
    
    if (onlyStarred) {
      const temp = vacancyList.filter(item => starredVacanciesID.includes(item.id))
      if (temp) list = temp
    }
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(list.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(list.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, vacancyList]);
  
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % list.length;
      setItemOffset(newOffset);
    };

    if (!list.length) {

      if (onlyStarred) {

        return (
          <>
          <div className='empty-catalogue-img'></div>
          <h2 className='empty-catalogue-label'>Упс, Здесь еще ничего нет!</h2>
          <button className='empty-catalogue-btn' onClick={() => navigate('/')}>Поиск Вакансий</button>
          </>
        )
      }

      return (
        <div className='spinner-wrapper'>
          <ClipLoader size={60} />
        </div>
      )
    }
  
    return (
      <>
        <Vacancies currentItems={currentItems} />
        <ReactPaginate
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="page-active"
          renderOnZeroPageCount={null}
        />
      </>
    );
}

export default PaginatedItems