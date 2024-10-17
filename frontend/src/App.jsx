import { Container } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayOut from './_auth/AuthLayOut';
import SignInForm from './_auth/SignInForm';
import SignUpForm from './_auth/SignUpForm';
import HomePage from './_root/HomePage';
import RootLayOut from './_root/RootLayOut';
import { useUserContext } from './lib/AuthContext';

const App = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <Container maxW='620px'>
      <Routes>
        {/* Auth Routes */}

        <Route element={<AuthLayOut />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>

        {/* Protected Routes  */}
        <Route element={<RootLayOut />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
