import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import SubHeader from "./Components/SubHeader";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contactus";
import Cards from "./Components/Cards";
import CardsDetails from "./Components/CardsDetails";
import AuthForm from "./Components/Auth/AuthForm";
import AuthContext from "./Components/store/Authcontext";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Header />
      <SubHeader />
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/store"
          element={authCtx.isLoggedIn ? <Cards /> : <Navigate to="/auth" />}
        />
        <Route path="/cart/:id" element={<CardsDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact Us" element={<Contact />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </div>
  );
}

export default App;
