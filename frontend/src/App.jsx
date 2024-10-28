import { Route, Routes } from 'react-router-dom';
import AuthLayOut from './_auth/AuthLayOut';
import SignInForm from './_auth/SignInForm';
import SignUpForm from './_auth/SignUpForm';
import HomePage from './_root/HomePage';
import RootLayOut from './_root/RootLayOut';

import CreatePost from './_root/CreatePost';
import Profile from './_root/Profile';
import Explore from './_root/Explore';
import People from './_root/People';
import Saved from './_root/Saved';
import UpdateProfile from './_root/UpdateProfile';

const App = () => {
  return (
    <main className='flex h-screen overflow-x'>
      <Routes>
        {/* Auth Routes */}

        <Route element={<AuthLayOut />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>

        {/* Protected Routes  */}
        <Route element={<RootLayOut />}>
          <Route index element={<HomePage />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/people' element={<People />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
