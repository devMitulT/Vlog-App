import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const RootLayOut = () => {
  return (
    <div className='w-full md:flex overflow-hidden h-full'>
      <div className='hidden md:block w-64 h-full overflow-hidden'>
        <NavBar />
      </div>
      <section className='flex flex-1 h-full overflow-y-auto'>
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayOut;
