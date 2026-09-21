import './App.css';

import Footer from './Ex4/Footer';
import Navigation from './Navigation';

/*
import MyProfile, { MySubjects } from './BaseComponent/MyProfile';
import logo from './BaseComponent/avt.png'
import logo1 from './BaseComponent/test.png'
import BaseUseState from './StateHook/BaseUseState';*/

/* //Exercise 4
import Pets from './Ex4/Pets';
*/

/* //Exercise 5
import Players from './Players';
*/

/* //Exercise 6
import Main from './Ex6/Main';*/

//Exercise 7
import Layout from './Ex7/Layout';

//Exercise 8
import './Ex8/Ex8.css';
import EX8Players from './Ex8/Ex8Players';

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

  /* //Exercise 4
  return (
    <div>
      <Navigation />
      <Pets />
      <Footer/>
    </div>
  )*/

  /* //Exercise 5
  return (
    <div>
      <Navigation />
      <Players />
      <Footer />
    </div>
  )*/

  /*//Exercise 6
  return (
    <div>
      <Navigation />
      <Main />
      <Footer />
    </div>
  )*/

  /* //Exercise 7
  return (
    <div>
      <Layout />
      <Footer />
    </div>
  )*/

  //Exercise 8
  return (
    <div>
      <Navigation />
      <EX8Players />
      <Footer />
    </div>
  )
}

export default App;
