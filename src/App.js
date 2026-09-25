/**
 * When you wanted to see exercises, just uncomment it, and make sure to keep the exercise label I put above :v
 * These not having any comments, PLEASE KEEP IT AS IT BE
 */
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

/* //Exercise 7
import Layout from './Ex7/Layout';*/

//Exercise 8
import './Ex8/Ex8.css';
import EX8Players from './Ex8/Ex8Players';

/* //Context Hook
import ComponentA from './ContextHook/ComponentA';*/

/*//Base Effect Hook
import BaseEffectHook from './EffectHook/BaseEffectHook';
import OnlineStatus from './EffectHook/OnlineStatus';
import { ThemeProvider } from './Ex9/ThemeContext';*/
import NavigationV3 from './Ex9/Navigation_v3';

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
      <NavigationV3 />
      <EX8Players />
      <Footer />
    </div>
  )

  //Context Hook
  /*return (
    <div>
      <Navigation />
      <ComponentA />
      <Footer />
    </div>
  )*/

  //Base Effect Hook
  //return (
  //  <div className='App'>
  //    <Navigation />*/
  //    {/*<BaseEffectHook />*/}
  //    (<OnlineStatus/>
  //    <Footer />
  //  </div>
  //)

  //Exercise 9


}

export default App;
