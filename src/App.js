import { useContext } from 'react';
import './App.css';
import Banner from './Orchid/components_main/misc/Banner';
import Footer from './Orchid/components_main/misc/Footer';
import OrchidContainer from './Orchid/components_main/main/OrchidContainer';
import Navigation from './Orchid/components_utils/Navigation';
import { ThemeContext } from './Orchid/components_utils/ThemeContext';
import AuthProvider from './Orchid/components_utils/AuthProvider';
import { Routes, Route } from 'react-router-dom';
import CheckoutForm from './Checkout/components_main/CheckoutForm';
import OrchidContact from './Orchid/components_main/main/OrchidContact';
import OrchidDetails from './Orchid/components_main/main/OrchidDetail';
import OrchidNaturalPresentation from './Orchid/components_main/main/OrchidNaturalPresentation';
import OrchidManage from './Orchid/components_main/admin/OrchidManage';
import OrchidAdd from './Orchid/components_main/admin/OrchidAdd';
import OrchidUpdate from './Orchid/components_main/admin/OrchidUpdate';
import OrchidDelete from './Orchid/components_main/admin/OrchidDelete';
import AdminRoute from './Orchid/components_utils/AdminRoute';

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
      <Banner />
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<OrchidContainer />}></Route>
          <Route path='/contact' element={<OrchidContact />}></Route>
          <Route path='/detail/:id' element={<OrchidDetails />}></Route>
          <Route path='/naturals' element={<OrchidNaturalPresentation />}></Route>
          <Route path='/lab4' element={<CheckoutForm />}></Route>
          {/* Admin Routes */}
          <Route path='/manage' element={<AdminRoute><OrchidManage /></AdminRoute>}></Route>
          <Route path='/manage/create' element={<AdminRoute><OrchidAdd /></AdminRoute>}></Route>
          <Route path='/manage/update/:id' element={<AdminRoute><OrchidUpdate /></AdminRoute>}></Route>
          <Route path='/manage/delete/:id' element={<AdminRoute><OrchidDelete /></AdminRoute>}></Route>
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
