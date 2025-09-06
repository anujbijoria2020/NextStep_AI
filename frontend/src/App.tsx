
import Auth from './pages/AuthPage';
import { Recents } from './pages/Recents';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './utils/ProtectedPage';
import HeroSection from './pages/HeroSection';

const App = () => {
  return (
  <BrowserRouter>
<Routes>
<Route path='/' element={<Layout/>}>
<Route index element={<HeroSection/>}/>
<Route path='/home' element={
  <ProtectedRoute>
    <HomePage/>
  </ProtectedRoute>
  }/>
  <Route path='/auth/login'  element={<Auth/>}/>
<Route path='/recents' element={<Recents/>}/>
<Route path='/recents/:contentId' element={<ContentPage/>}/>
<Route path='/contact' element={<ContactPage/>}/>
</Route>

</Routes>
<Toaster position='top-right' reverseOrder={false}/>
  </BrowserRouter>
  );
};

export default App;
