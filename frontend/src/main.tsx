import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from 'react-dom/client';
import './styles/global.css'
import LoginPage from './pages/auth/LoginPage.tsx'
import RegisterPage from './pages/auth/RegisterPage.tsx';
import VerifyEmailPage from './pages/auth/VerifyEmailPage.tsx';

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />
    </Routes>
  </BrowserRouter>,
)
