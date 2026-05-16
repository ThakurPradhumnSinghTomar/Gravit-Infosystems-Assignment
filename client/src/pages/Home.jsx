import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <section className='min-h-[88vh] bg-cover bg-center relative' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1800&auto=format&fit=crop')" }}>
        <div className='absolute inset-0 bg-slate-900/50' />
        <div className='relative z-10 max-w-6xl mx-auto px-6 py-20 text-white'>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className='text-5xl md:text-7xl font-bold leading-tight'>Discover & Book<br/>Extraordinary Events</motion.h1>
          <p className='mt-6 text-lg max-w-2xl text-slate-100'>From music festivals to AI summits, secure your seats in real time with smart ticketing and QR access.</p>
          <div className='mt-8 flex gap-4'>
            <Link to='/events' className='px-7 py-3 bg-indigo-600 rounded-full font-semibold'>Explore Events</Link>
            <Link to='/register' className='px-7 py-3 bg-white/15 backdrop-blur rounded-full font-semibold border border-white/30'>Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
