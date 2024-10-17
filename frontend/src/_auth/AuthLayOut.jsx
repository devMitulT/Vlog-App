import { useUserContext } from '../lib/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayOut() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <div className='bg-gradient-to-r from-gray-900 via-dark-1 to-gray-900'>
          <section>
            <Outlet />
          </section>
        </div>
      )}
    </>
  );
}
