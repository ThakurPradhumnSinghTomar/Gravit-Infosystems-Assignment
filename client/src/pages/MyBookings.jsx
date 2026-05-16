import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.get('/bookings/my');
      setBookings(data);
    } catch {
      toast.error('Please login to view bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const cancelBooking = async (id) => {
    await api.put(`/bookings/${id}/cancel`);
    toast.success('Booking cancelled');
    load();
  };

  if (loading) return <div className='p-6'>Loading bookings...</div>;

  return <div className='max-w-5xl mx-auto p-6'>
    <h1 className='text-3xl font-bold mb-5'>My Bookings</h1>
    <div className='space-y-4'>
      {bookings.map((b)=><div key={b.id} className='glass rounded-2xl p-4 shadow flex items-center justify-between'>
        <div><p className='font-semibold'>{b.title}</p><p className='text-sm text-slate-600'>{new Date(b.date).toLocaleString()} · Qty {b.quantity} · ${b.total_amount}</p><p className='text-xs uppercase mt-1'>{b.status}</p></div>
        {b.status==='confirmed' && <button onClick={()=>cancelBooking(b.id)} className='px-4 py-2 rounded-lg bg-rose-600 text-white'>Cancel</button>}
      </div>)}
      {bookings.length===0 && <p>No bookings yet.</p>}
    </div>
  </div>;
}
