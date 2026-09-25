import { useContext } from 'react';
import './App.css';
import Banner from './Orchid/components/Banner';
import Footer from './Orchid/components/Footer';
import Orchid from './Orchid/components/Orchid';
import Navigation from './Orchid/utils/Navigation';
import { ThemeContext } from './Orchid/utils/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
      <Banner />
      <Navigation />
      <Orchid />
      <Footer />
    </div>
  );
}

export default App;
