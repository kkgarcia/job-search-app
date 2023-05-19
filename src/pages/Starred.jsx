import PaginatedItems from "../components/VacancyList"

const Favorites = () => {

    return (
        <div className="container">
            <div className="starred-wrapper">
                <PaginatedItems itemsPerPage={4} onlyStarred={true} />
            </div>
        </div>
    )
}

export default Favorites