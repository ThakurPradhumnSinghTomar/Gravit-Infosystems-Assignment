import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/auth/register', form);
      toast.success('Account created. Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return <div className='min-h-screen grid md:grid-cols-2'>
    <div className='hidden md:block bg-cover bg-center' style={{backgroundImage:"url('https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop')"}} />
    <div className='flex items-center justify-center p-8'>
      <form onSubmit={onSubmit} className='w-full max-w-md glass rounded-3xl p-8 shadow-xl'>
        <h1 className='text-3xl font-bold mb-2'>Create account</h1>
        <p className='text-slate-600 mb-6'>Book premium events in seconds.</p>
        <input className='w-full p-3 rounded-xl border mb-3' placeholder='Full name' required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input className='w-full p-3 rounded-xl border mb-3' placeholder='Email' type='email' required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className='w-full p-3 rounded-xl border mb-4' placeholder='Password' type='password' minLength='6' required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button disabled={submitting} className='w-full p-3 rounded-xl bg-emerald-600 text-white'>{submitting ? 'Creating...' : 'Sign up'}</button>
        <p className='mt-4 text-sm'>Already have an account? <Link to='/login' className='text-indigo-600 font-semibold'>Login</Link></p>
      </form>
    </div>
  </div>;
}
