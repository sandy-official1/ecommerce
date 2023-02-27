import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import Header from "./Components/Header";
import SubHeader from "./Components/SubHeader";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contactus";
import CardsData from "./Components/CardsData";
import { useState, useEffect } from "react";
import Cards from "./Components/Cards";
import CardsDetails from "./Components/CardsDetails";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook
import AuthForm from "./Components/Auth/AuthForm";
import AuthContext from "./Components/store/Authcontext";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Header />
      <SubHeader />
      <Routes>
        <Route
          path="/store"
          element={
            authCtx.isLoggedIn ? <Cards /> : () => <Navigate to="/auth" />
          }
        />

        <Route path="/cart/:id" element={<CardsDetails />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/Contact Us" element={<Contact Us />}></Route>

        <Route path="/auth" element={<AuthForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
