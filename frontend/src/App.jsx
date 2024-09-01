import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import DashboardPage from './pages/DashboardPage';
import { Login } from './pages/AuthForm';
import { Register } from './pages/AuthForm';
import PageNotFound from './pages/PageNotFound';
function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/add" element={isLoggedIn ? <AddJobPage /> : <Login />} />
            <Route path="/edit/:id" element={isLoggedIn ? <EditJobPage /> : <Login />} />
            <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
