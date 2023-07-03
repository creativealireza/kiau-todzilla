import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { UITabs } from "./components/UITabs/UITabs";
import { LandingPage } from "./components/LandingPage/LandingPage";

import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <UITabs />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
