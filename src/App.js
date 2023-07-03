import { useState } from 'react';
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"
import { UITabs } from "./components/UITabs/UITabs";
import { Authentication } from "./Authentication/Authentication";
import { readData } from "./Tools/localActions";
import { useSelector } from 'react-redux'
import { LandingPage } from "./components/LandingPage/LandingPage";
export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const [authDialog, setAuthDialog] = useState(false)

  return (
    <>
      <Header setAuthDialog={setAuthDialog} auth={isAuth || readData('user')?.members?.length} />

      {isAuth || readData('user')?.members?.length
        ? <UITabs /> : authDialog
          ? <Authentication isAuth setMainAuthDialog={setAuthDialog} /> : <LandingPage setAuthDialog={setAuthDialog} />}

      <Footer />
    </>
  );
}