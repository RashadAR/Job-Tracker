import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            <Route path="*" element={<PageNotFound />} />
            <Route path="/add" element={isLoggedIn ? <AddJobPage /> : <LoginPage />} />
            <Route path="/edit/:id" element={isLoggedIn ? <EditJobPage /> : <LoginPage />} />
            <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
