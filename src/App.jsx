import { HashRouter, Routes, Route } from 'react-router-dom'

import Header from './layouts/HeaderLayout'
import Home from './pages/Home'
import Favorites from './pages/Starred'
import VacancyDetails from './pages/VacancyDetails'
import { StateContext } from './context/StateContext'
import { Toaster } from 'react-hot-toast'


function App() {
  
  return (
    <HashRouter>
      <StateContext>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path='/' element={<Home />} />
            <Route path='/:vacancyId' element={<VacancyDetails />} />
            <Route path='/starred' element={<Favorites />} />
          </Route>
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
        <Toaster />
      </StateContext>
    </HashRouter>
  )
}

export default App
