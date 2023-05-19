import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../hooks/useStateContext'
import { BsDot } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { toast } from 'react-hot-toast'


const Vacancy = ({ value }) => {

    const [isStarred, setIsStarred] = useState(false)
    const { starredVacanciesID, setStarredVacanciesID} = useStateContext()
    const { id, profession, payment_from, type_of_work, town } = value
    
    const handleOnClick = () => {

        if (starredVacanciesID.includes(id)){
            setStarredVacanciesID(prev => {
                const newList = prev.filter(itemId => itemId !== id)
                return newList
            })
            setIsStarred(false)
            return
        }

        setStarredVacanciesID(prev => {
            return [...prev, id]
        })

        setIsStarred(prev => {
            return !prev
        })
        toast.success('Добавлено в Избранное')
    }

    return (
        <div className="vacancy" data-elem={`vacancy-${id}`}>
            <div className="profession-title-wrapper">
                <Link to={`/${id}`}>
                    <h3 className='profession-title'>{profession}</h3> 
                </Link>
                <button className='star-btn' onClick={handleOnClick} data-elem={`vacancy-${id}-shortlist-button`}>
                    {isStarred || 
                    starredVacanciesID.includes(id) ? 
                          <AiFillStar color='#5E96FC' size={25} />
                        : <AiOutlineStar color='#ACADB9' size={25} />}
                </button>
            </div>
            <div className='payment-and-type'>
                {payment_from ? <b>{`з/п от ${payment_from} rub`}</b> : <b>{'з/п не указана'}</b>}
                <BsDot color='#ACADB9' size={25} />
                <p>{type_of_work.title}</p>
            </div>
            <div className='location'>
                <HiOutlineLocationMarker color='#ACADB9' />
                <p>{town.title}</p>
            </div>
        </div>
    )
}

export default Vacancy