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

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
      <Banner />
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<OrchidContainer />}></Route>
          { /*<Route path='/lab4' element={<OrchidContainer />}></Route> Lab 4, since I'm too lazy to create ANOTHER BRANCH for this */}
          <Route path='/lab4' element={<CheckoutForm />}></Route>
          <Route path='/contact' element={<OrchidContact />}></Route>
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
