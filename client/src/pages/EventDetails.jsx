import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { QRCodeCanvas } from 'qrcode.react';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [qr, setQr] = useState('');

  useEffect(() => {
    api.get(`/events/${id}`).then((r) => setEvent(r.data));
  }, [id]);

  const book = async () => {
    try {
      const { data } = await api.post('/bookings', { event_id: +id, quantity, name: 'Guest User', email: 'guest@example.com', mobile: '1234567890' });
      setQr(data.qr_code);
      toast.success('Booking confirmed');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Booking failed. Login first.');
    }
  };

  if (!event) return <div className='p-6'>Loading...</div>;
  return <div className='p-6 max-w-4xl mx-auto'>
    {qr && <Confetti recycle={false} numberOfPieces={240} />}
    <img src={event.image} className='w-full h-80 object-cover rounded-2xl shadow' />
    <h2 className='text-4xl font-bold mt-5'>{event.title}</h2>
    <p className='text-slate-600 mt-2'>{event.location} · {new Date(event.date).toLocaleString()}</p>
    <p className='mt-4'>{event.description}</p>
    <p className='mt-4 font-semibold'>Available Seats: {event.available_seats}</p>
    <div className='flex gap-2 mt-4'>
      <input type='number' min='1' value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} className='border rounded p-2 w-24' />
      <button onClick={book} className='bg-emerald-600 text-white px-5 rounded-lg'>Book Now</button>
    </div>
    {qr && <div className='mt-8 bg-white p-4 rounded-xl inline-block'><p className='font-semibold mb-2'>Your QR Ticket</p><QRCodeCanvas value={qr} size={180} /></div>}
  </div>;
}
