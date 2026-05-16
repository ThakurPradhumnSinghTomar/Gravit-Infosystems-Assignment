import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Welcome back!');
      navigate('/events');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return <div className='min-h-screen grid md:grid-cols-2'>
    <div className='hidden md:block bg-cover bg-center' style={{backgroundImage:"url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop')"}} />
    <div className='flex items-center justify-center p-8'>
      <form onSubmit={onSubmit} className='w-full max-w-md glass rounded-3xl p-8 shadow-xl'>
        <h1 className='text-3xl font-bold mb-2'>Login</h1>
        <p className='text-slate-600 mb-6'>Access your bookings and tickets.</p>
        <input className='w-full p-3 rounded-xl border mb-3' placeholder='Email' type='email' required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className='w-full p-3 rounded-xl border mb-4' placeholder='Password' type='password' required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button disabled={submitting} className='w-full p-3 rounded-xl bg-indigo-600 text-white'>{submitting ? 'Logging in...' : 'Login'}</button>
        <p className='mt-4 text-sm'>No account? <Link to='/register' className='text-indigo-600 font-semibold'>Create one</Link></p>
      </form>
    </div>
  </div>;
}
