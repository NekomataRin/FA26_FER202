import { useContext } from 'react';
import './App.css';
import Banner from './Orchid/components_main/misc/Banner';
import Footer from './Orchid/components_main/misc/Footer';
import OrchidContainer from './Orchid/components_main/main/OrchidContainer';
import Navigation from './Orchid/components_utils/Navigation';
import { ThemeContext } from './Orchid/components_utils/ThemeContext';
import AuthProvider from './Orchid/components_utils/AuthProvider';

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
      <Banner />
      <AuthProvider>
        <Navigation />
        <OrchidContainer />
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
