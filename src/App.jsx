import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import useAuth from "./hooks/useAuth";
import { useEffect } from 'react';
import Admin from './pages/Admin';

function App() {
  const { user, loading, isLoggedIn } = useAuth();
  useEffect(() => {
    console.log(user)
  }, [user])
  if (loading) return <span>Checking auth…</span>;

  return (
    <>
      <Router>
        <span hidden>
          {isLoggedIn ? `Logged in as ${user?.email}` : "Logged out"}
        </span>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
