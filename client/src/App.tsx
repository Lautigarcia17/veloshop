import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout/Layout'

import ToastrProvider from './context/ToastrContext'
import { NotFoundPage } from './lazyRoutes'
import AuthPage from './pages/AuthPage/AuthPage'
import Home from './pages/Home/Home'

function App() {


  return (
    <>
      <ToastrProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<AuthPage />}></Route>
            <Route path='auth' element={<AuthPage />}></Route>
            <Route path='home' element={<Home />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ToastrProvider>
    </>
  )
}

export default App
