import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch {
        setError('Unable to load events. Make sure backend and DB are running and seeded.');
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const filtered = useMemo(() => events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase())), [events, query]);

  return <div className='max-w-7xl mx-auto p-6'>
    <h1 className='text-3xl font-bold mb-4'>Upcoming Events</h1>
    <input className='w-full md:w-80 p-3 rounded-xl border mb-6' placeholder='Search by title...' value={query} onChange={(e)=>setQuery(e.target.value)} />
    {loading && <p>Loading events...</p>}
    {error && <p className='text-red-600'>{error}</p>}
    {!loading && !error && filtered.length === 0 && <p>No events found.</p>}
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {filtered.map((event) => <Link key={event.id} to={`/events/${event.id}`} className='glass rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition'>
        <img src={event.image} className='h-48 w-full object-cover' />
        <div className='p-4'>
          <h3 className='text-xl font-bold'>{event.title}</h3>
          <p className='text-slate-600'>{event.location}</p>
          <p className='text-slate-700 mt-1'>{new Date(event.date).toLocaleString()}</p>
          <p className='font-semibold mt-2'>${event.price}</p>
        </div>
      </Link>)}
    </div>
  </div>;
}
