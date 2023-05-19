import { useState } from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { HiMenu } from 'react-icons/hi'
import { TbHomeSearch } from 'react-icons/tb'
import { BsBookmarkStar } from 'react-icons/bs'

const Header = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const toggleSideBar = () => {
        setIsSideBarOpen(prev => !prev)
    }

    return (
        <>
        <header className='header-bgc'>
            <div className='main-header container'>
                <Link to='/'>
                    <div className='logo-wrapper'>
                        <div className='custom-logo'>
                            <div className='logo-first'></div>
                            <div className='logo-second'></div>
                        </div>
                        <h1>Jobored</h1>
                    </div>
                </Link>
                <div className='nav-links-wrapper'>
                    <ul className='nav-links'>
                        <NavLink to='/'>
                            <li>Поиск Вакансий</li>
                        </NavLink>
                        <NavLink to='/starred'>
                            <li>Избранное</li>
                        </NavLink>
                    </ul>
                </div>
                <button className='burger-btn-open' onClick={toggleSideBar}>
                    <HiMenu size={30}/>
                </button>
            </div>
            {isSideBarOpen && <div className='side-bar-bg' onClick={toggleSideBar}></div>}
            <div className={`side-bar ${isSideBarOpen && 'side-bar-open'}`}>
                <div className='side-bar-head'>

                </div>
                <ul>
                    <Link to='/' onClick={toggleSideBar}>
                        <li><TbHomeSearch size={20} />Поиск Вакансий</li>
                    </Link>
                    <Link to='/starred' onClick={toggleSideBar}>
                        <li><BsBookmarkStar size={20} />Избранное</li>
                    </Link>
                </ul>
            </div>
        </header>
        <Outlet />
        </>
    )
}

export default Header

