import { Select, NumberInput } from '@mantine/core'
import { IoMdClose } from 'react-icons/io'

const FilterTab = ({values}) => {
    const { resetFilterFields,
            selectValue,
            setSelectValue,
            catalogues_data,
            from,
            setFrom,
            to,
            setTo,
            handleOnClick
          } = values

    return (
        <>
        <div className='filter-label'>
            <h3>Фильтры</h3>
            <button className='reset-filter-btn' onClick={resetFilterFields}>Сбросить все <IoMdClose color='grey' /></button>
        </div>
        <Select
            data-elem='industry-select'
            value={selectValue}
            onChange={setSelectValue}
            label='Отрасль'
            placeholder='Выберите отрасль'
            data={catalogues_data}
            />
        <div className='salary-wrapper'>
            <NumberInput
                data-elem='salary-to-input'
                label='Оклад'
                placeholder='От'
                value={from}
                onChange={setFrom}
                hideControls
                />
            <NumberInput
                data-elem='industry-select'
                placeholder='До'
                value={to}
                onChange={setTo}
                hideControls
            />
        </div>
        <button 
            data-elem='search-button'
            className='filter-apply-btn' 
            onClick={handleOnClick}
        >Применить</button>
        </>
    )
}

export default FilterTab