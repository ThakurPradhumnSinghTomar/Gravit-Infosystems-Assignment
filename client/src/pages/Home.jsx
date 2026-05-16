import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export default function Home(){return <div className='min-h-screen flex items-center justify-center'><motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className='glass p-10 rounded-3xl shadow-xl text-center'><h1 className='text-4xl font-bold mb-4'>Smart Event Booking</h1><p className='mb-6'>Book premium events with real-time seats and QR tickets.</p><Link to='/events' className='px-6 py-3 rounded-full bg-indigo-600 text-white'>Explore Events</Link></motion.div></div>}
