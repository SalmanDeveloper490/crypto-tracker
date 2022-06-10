import React from "react";
import "./App.css";
import "./responsive.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Markets from "./pages/Markets/Markets";
import Exchanges from "./pages/Exchanges/Exchanges";
import CoinDetails from "./pages/CoinDetails/CoinDetails";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/markets" element={<Markets />} />
        <Route exact path="/exchanges" element={<Exchanges />} />
        <Route exact path="/coin/:id" element={<CoinDetails />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
