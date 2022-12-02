import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import LogIn from './pages/LogIn'
import NavBar from './components/NavBar'
import LoadingScren from './components/LoadingScren'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'
import NewUser from './pages/NewUser'

function App() {
  const isloading = useSelector(state => state.isloading)


  return (
    <div >
      <HashRouter>
        <NavBar />
        {isloading && <LoadingScren />}
        <Container className='my-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route element={<ProtectedRoutes/>}>
              <Route path='/purchases' element={<Purchases />} />
            </Route>
            <Route path='/login' element={<LogIn />} />
            <Route path='/newuser' element={<NewUser />} />
          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App

