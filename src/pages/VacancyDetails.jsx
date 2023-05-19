import { useParams } from 'react-router-dom'
import { useStateContext } from '../hooks/useStateContext'

import Vacancy from '../components/Vacancy'

const VacancyDetails = () => {
    const { vacancyId } = useParams()
    const { vacancyList } = useStateContext()

    const vacObject = vacancyList.find(item => item?.id === parseInt(vacancyId))
    const detailsText = {__html: vacObject?.vacancyRichText}


    return (
        <div className='container'>
            <div className='vacancy-details-wrapper'>
                {vacObject && <Vacancy value={vacObject} />}
                {vacObject && <div className='details-container' dangerouslySetInnerHTML={detailsText}></div>}
            </div>
        </div>
    )
}

export default VacancyDetails