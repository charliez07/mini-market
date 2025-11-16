import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateListing from "./pages/CreateListing";
import MySelling from "./pages/MySelling";
import MyBuying from "./pages/MyBuying";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateListing />} />
              <Route path="/my-selling" element={<MySelling />} />
              <Route path="/my-buying" element={<MyBuying />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
