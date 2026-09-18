import './App.css';
import Footer from './Ex4/Footer';
import Pets from './Ex4/Pets';
import Navigation from './Navigation';
/*
import MyProfile, { MySubjects } from './BaseComponent/MyProfile';
import logo from './BaseComponent/avt.png'
import logo1 from './BaseComponent/test.png'
import BaseUseState from './StateHook/BaseUseState';*/

function App() {
  /*
  let key = Math.random()
  let avtLogo = (Number(key) < 0.5) ? logo : logo1
  let altText = (Number(key) < 0.5) ? "Murasame" : "Salt"
  return (
    <div className="App">
      <header className="App-header">
        <MyProfile
          textInfo={"Hello, My Profile!"}
          imgInfo={
            {
              src: avtLogo,
              alt: altText
            }
          } />
      </header>
      <BaseUseState/>
      <MySubjects />
    </div>

  );*/
  return (
    <div>
      <Navigation />
      <Pets />
      <Footer/>
    </div>
  )
}

export default App;
