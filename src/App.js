import { useContext } from 'react';
import './App.css';
import Banner from './Orchid/components/misc/Banner';
import Footer from './Orchid/components/misc/Footer';
import Orchid from './Orchid/components/main/Orchid';
import Navigation from './Orchid/utils/Navigation';
import { ThemeContext } from './Orchid/utils/ThemeContext';
import AuthProvider from './Orchid/utils/AuthProvider';

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
      <Banner />
      <AuthProvider>
        <Navigation />
        <Orchid />
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
