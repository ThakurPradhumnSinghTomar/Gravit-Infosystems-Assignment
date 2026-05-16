import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';

function Nav() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return <nav className='p-4 flex items-center justify-between bg-white/80 backdrop-blur sticky top-0 z-20 border-b'>
    <Link to='/' className='font-bold text-xl text-indigo-700'>EventFlow</Link>
    <div className='flex gap-4 items-center'>
      <Link to='/events'>Events</Link>
      {user && <Link to='/bookings'>My Bookings</Link>}
      {!user ? <>
        <Link to='/login' className='px-4 py-2 rounded-lg border'>Login</Link>
        <Link to='/register' className='px-4 py-2 rounded-lg bg-indigo-600 text-white'>Signup</Link>
      </> : <>
        <span className='text-sm text-slate-600'>Hi, {user.name}</span>
        <button onClick={logout} className='px-4 py-2 rounded-lg bg-rose-600 text-white'>Logout</button>
      </>}
    </div>
  </nav>;
}

export default function App() {
  return <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events' element={<Events />} />
      <Route path='/events/:id' element={<EventDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/bookings' element={<MyBookings />} />
      <Route path='/admin' element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>;
}
