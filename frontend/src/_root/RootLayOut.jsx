import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const RootLayOut = () => {
  return (
    <>
      <h1>Header</h1>
      <NavLink />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

export default RootLayOut;
